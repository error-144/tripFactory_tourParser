# tour-parser

A small Node.js tool that extracts places from a travel paragraph using OpenAI and geocodes them with Google Maps Geocoding API.

## Prerequisites
- Node.js 18+
- OpenAI API key
- Google Maps Geocoding API key

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   # Optional: override the default model (defaults to gpt-4o-mini)
   OPENAI_MODEL=gpt-4o-mini

   GOOGLE_API_KEY=your_google_maps_api_key_here
   ```

## Run

- Run with your own paragraph:
  ```bash
  npm start -- "We started in Delhi, passed by Agra Fort, and visited Jaipur."
  ```
  Notes:
  - The `--` ensures the quoted string is passed to `node src/index.js`.
  - You can also run directly:
    ```bash
    node src/index.js "We started in Delhi, passed by Agra Fort, and visited Jaipur."
    ```

- Quick test (uses the sample from package.json):
  ```bash
  npm run test
  ```

## Output
The tool prints a JSON object like:
```json
{
  "tour_text": "We started in Delhi, passed by Agra Fort, and visited Jaipur.",
  "places": [
    {
      "name": "Delhi",
      "visited": true,
      "passby": false,
      "lat": 28.6139,
      "lon": 77.209
    }
    // ...
  ],
  "metadata": {
    "model": "gpt-4o-mini",
    "geocoder": "Google Maps Geocoding API",
    "timestamp": "2025-01-01T12:00:00.000Z"
  }
}
```

## Notes
- Make sure billing/quotas are enabled for both OpenAI and Google Maps APIs.
- For verbose logs, the tool currently prints progress to the console (model calls, geocoding timings, etc.).
- If you encounter network or quota errors, re-run after a short delay.