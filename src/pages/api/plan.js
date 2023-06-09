import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-SZLwyfrU6qwtX9czsudt6bBy',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export default async function (req, res) {

  const { mem } = req.body;
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    //max_tokens: 3500,
    messages: [
      {
        role: 'system',
        content:
          `
          Plan a detailed trip. 
          Format: {Day: {Hour, Location}} json
          example:
          {
          "Day 1": {
          "8:00am": "Arrival in Rome, Italy",
          "10:00am": "Check-in at luxury hotel in Rome",
          "11:00am": "Explore Vatican City and St. Peter's Basilica",
          "1:00pm": "Lunch at a traditional Italian restaurant",
          "2:30pm": "Visit the Colosseum and Roman Forum",
          "4:30pm": "Relax at Villa Borghese Gardens",
          "7:00pm": "Dinner at a Michelin-starred restaurant in Rome"
          },
          "Day 2": {
          "9:00am": "Visit the Pantheon and Piazza Navona",
          "11:00am": "Explore the Trevi Fountain and Spanish Steps",
          "1:00pm": "Lunch at a rooftop restaurant with panoramic views of Rome",
          "3:00pm": "Visit the Capitoline Museums",
          "5:00pm": "Relax at the Aventine Hill for sunset views",
          "7:00pm": "Dinner at a family-owned trattoria in Rome"
          },
          "Day 3": {
          "9:00am": "Check-out from the hotel in Rome",
          "10:00am": "Private transfer to Tuscany",
          "12:00pm": "Arrival at a luxury villa in the Tuscan countryside",
          "1:00pm": "Wine tasting tour at a local vineyard",
          "3:00pm": "Relax by the pool at the villa",
          "7:00pm": "Private chef-prepared dinner at the villa"
          },
          "Day 4": {
          "9:00am": "Explore the medieval town of San Gimignano",
          "11:00am": "Visit a local farm and learn about Tuscan cuisine",
          "1:00pm": "Lunch at a traditional Tuscan trattoria",
          "3:00pm": "Relax at the villa and enjoy the scenic countryside",
          "7:00pm": "Cooking class with a local chef followed by dinner at the villa"
          },
          "Day 5": {
          "9:00am": "Check-out from the villa in Tuscany",
          "10:00am": "Private transfer to Paris, France",
          "1:00pm": "Arrival in Paris and check-in at a luxury hotel",
          "2:00pm": "Visit the Eiffel Tower and Trocadéro Gardens",
          "4:00pm": "Explore the Louvre Museum",
          "7:00pm": "Dinner at a Michelin-starred restaurant in Paris"
          },
          "Day 6": {
          "9:00am": "Explore Montmartre and visit Sacré-Coeur",
          "11:00am": "Visit Notre-Dame Cathedral and Île de la Cité",
          "1:00pm": "Lunch at a traditional Parisian bistro",
          "3:00pm": "Stroll along the Seine River and enjoy the views",
          "5:00pm": "Visit the Palace of Versailles",
          "7:00pm": "Farewell dinner at a gourmet French restaurant in Paris"
          },
          "Day 7": {
          "9:00am": "Check-out from the hotel in Paris",
          "10:00am": "Private transfer to the airport for departure"
          }
          }
          `,
      },
      ...mem
    ],
  });

  res
    .status(200)
    .json({ response: completion.data.choices[0].message });
}

export function parse(text) {
  return text.split('\n').map((line) => {
    const [role, content] = line.split(': ');
    return { role, content };
  });
}
