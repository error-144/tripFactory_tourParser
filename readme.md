# tour-parser

A small  tool that extracts places from a travel paragraph using OpenAI and geocodes (Google Maps API) them with Google Maps Geocoding API.

## Install (npm)
- Install from npm:
  ```bash
  npm install tour-parser
  ```
- NPM package: `https://www.npmjs.com/package/tour-parser`

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

- Another short example:
  ```bash
  npm start -- "We left Mumbai, passed through Pune, and visited Goa."
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
      "lat": 28.7040592,
      "lon": 77.10249019999999
    },
    {
      "name": "Agra Fort",
      "visited": false,
      "passby": true,
      "lat": 27.1795328,
      "lon": 78.021112
    },
    {
      "name": "Jaipur",
      "visited": true,
      "passby": false,
      "lat": 26.9124336,
      "lon": 75.7872709
    }
  ],
  "metadata": {
    "model": "gpt-5",
    "geocoder": "Google Maps Geocoding API",
    "timestamp": "2025-10-06T21:45:13.077Z"
  }
}
```

## Notes
- Make sure billing/quotas are enabled for both OpenAI and Google Maps APIs.
- if you find any error or issue DM to s.aryan.kumar040@gmail.com