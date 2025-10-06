import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is required in environment.");
}

// Function jo latitude and longitude nikalne ke liye hai 
export async function geocodePlace(name) {
  if (!name) return { lat: null, lon: null };
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    name
  )}&key=${GOOGLE_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();    //convert to json format 
    if (data.status !== "OK" || !data.results || data.results.length === 0) {
      return { lat: null, lon: null };
    }
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lon: loc.lng };
  } catch {
    return { lat: null, lon: null };
  }
}
