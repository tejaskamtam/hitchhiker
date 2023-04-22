import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-SZLwyfrU6qwtX9czsudt6bBy',
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);


export default async function (req, res) {
  const { prompt, mem } = req.body;
  console.log(prompt);
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "You are a trip advisor. Users will enter details on dates and location, respond with a list of activities and events that follow the user's plan.",
      },
      ...mem,
      { role: 'user', content: prompt },
    ],
  });

  res
    .status(200)
    .json({ response: completion.data.choices[0].message });
}