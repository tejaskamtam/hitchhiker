// 

export const make_trip = async (user, start_date, days, start_location, end_location, num_travelers="1", budget="economy", transportation="any",tags="none") => {
  let history = [];
  history.push({
    role: "user",
    content: `
    Plan a detailed trip. 
    Format: {Day: {Hour, Location}} json
    Preferences:
      start date: ${start_date}
      days: ${days}
      start location: ${start_location}
      end location: ${end_location}
      travelers: ${num_travelers}
      budget: ${budget}
      transportation: ${transportation}
      other tags: ${tags}
    `,
  });
  console.log(history);
  // get itinerary from OpenAI
  let response = await fetch("../api/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mem: history }),
  });
  const res = await response.json();
  history.push(res.response);
  let itinerary = plan_parse(res.response.content);
  // get location from OpenAI
  response = await fetch("../api/locs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan: res.response.content }),
  });
  const res2 = await response.json();
  let locations = loc_parse(res2.response.content);
  console.log(itinerary);

  const doc_id = addDoc(collection(db, "trips"), {
    user: user.email,
    trip: itinerary,
    locations: locations,
  });
  console.log(locations);
}