import dotenv from "dotenv";    //always best practice to import dotenv first
import OpenAI from "openai";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";    // open ai- 4o cheapest model hain 

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required in environment.");
}

const client = new OpenAI({ apiKey: OPENAI_API_KEY });

// required structure which i want to return 
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
    temperature: 0      // 0 means no randomness and most predictable output 
  });

  const fn = resp.choices?.[0]?.message?.function_call; //catch the first messegae
  
  if (!fn?.arguments) {
    throw new Error("OpenAI did not return structured function_call arguments.");
  }
  try {
    return JSON.parse(fn.arguments);
  } catch (err) {
    throw new Error("Failed to parse OpenAI function arguments: " + err.message);
  }
}
