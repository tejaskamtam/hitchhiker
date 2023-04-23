import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-SZLwyfrU6qwtX9czsudt6bBy',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export default async function (req, res) {
  const { days, loc, mem } = req.body;
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    messages: [
      {
        role: 'system',
        content:
          'You are a travel agent. You will recommend actvities based on user input. Output with a detailed itinerary.',
      },
      ...mem,
      { role: 'user', content: `Plan a ${days} day trip to ${loc} with a specific itinerary with specified time for each activity.` },
    ],
  });

  res
    .status(200)
    .json({ response: completion.data.choices[0].message });
}

