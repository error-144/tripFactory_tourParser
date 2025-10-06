import dotenv from "dotenv";
dotenv.config();
import { parseParagraph } from "./parser.js";

const paragraph = process.argv.slice(2).join(" ");
if (!paragraph) {
  console.error('Usage: node src/index.js "Your tour paragraph here"');
  process.exit(1);
}

(async () => {
  try {
    const result = await parseParagraph(paragraph);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Error:", err.message || err);
    process.exit(1);
  }
})();
