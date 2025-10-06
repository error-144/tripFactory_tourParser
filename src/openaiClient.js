import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required in environment.");
}

const client = new OpenAI({ apiKey: OPENAI_API_KEY });

const FUNCTION_SCHEMA = {
  name: "extract_places",
  description:
    "Extract all places or landmarks (cities, monuments, temples, forts, beaches, etc.) from the text. For each, provide booleans visited/passby.",
  parameters: {
    type: "object",
    properties: {
      tour_text: { type: "string" },
      places: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            visited: { type: "boolean" },
            passby: { type: "boolean" }
          },
          required: ["name", "visited", "passby"]
        }
      }
    },
    required: ["tour_text", "places"]
  }
};

export async function extractPlaces(text) {
  const messages = [
    {
      role: "system",
      content:
        "You are a travel text parser. Extract every place or landmark from the text. " +
        "Mark visited=true if the text implies a stop or visit, passby=true if only seen or driven past. " +
        "Return JSON using the provided function schema only."
    },
    { role: "user", content: text }
  ];

  const resp = await client.chat.completions.create({
    model: MODEL,
    messages,
    functions: [FUNCTION_SCHEMA],
    function_call: { name: "extract_places" },
    temperature: 0
  });

  const fn = resp.choices?.[0]?.message?.function_call;
  if (!fn?.arguments) {
    throw new Error("OpenAI did not return structured function_call arguments.");
  }
  try {
    return JSON.parse(fn.arguments);
  } catch (err) {
    throw new Error("Failed to parse OpenAI function arguments: " + err.message);
  }
}
