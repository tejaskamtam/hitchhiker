// returns JSON itinerary from OpenAI
export const plan_parse = (text) => {
  let start = text.indexOf("{");
  let end = text.lastIndexOf("}");
  let json = text.substring(start, end + 1);
  let obj = JSON.parse(json);
  return obj;
}

// returns list of locations from OpenAI
export const loc_parse = (text) => {
  let start = text.indexOf("[");
  let end = text.lastIndexOf("]");
  let json = text.substring(start, end + 1);
  let obj = JSON.parse(json);
  return obj;
}