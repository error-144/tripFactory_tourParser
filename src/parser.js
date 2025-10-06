import { extractPlaces } from "./openaiClient.js";
import { geocodePlace } from "./geocodeGoogle.js";

/**
 * parseParagraph(paragraph)
 * returns { tour_text, places: [{name, visited, passby, lat, lon}], metadata }
 */
export async function parseParagraph(paragraph) {
  const extracted = await extractPlaces(paragraph);
  const tourText = extracted.tour_text || paragraph;
  const places = extracted.places || [];

  const outPlaces = [];
  for (const p of places) {
    const name = p.name;
    const geo = await geocodePlace(name);
    outPlaces.push({
      name,
      visited: Boolean(p.visited),
      passby: Boolean(p.passby),
      lat: geo.lat,
      lon: geo.lon
    });
  }

  return {
    tour_text: tourText,
    places: outPlaces,
    metadata: {
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      geocoder: "Google Maps Geocoding API",
      timestamp: new Date().toISOString()
    }
  };
}
