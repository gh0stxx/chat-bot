// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prompt = req.query.prompt;

  if (prompt === undefined) {
    res.status(400).json({ error: 'prompt is required' });
    return;
  }

  if (prompt.length > 100) {
    res.status(400).json({ error: 'prompt is too long' });
    return;
  }

 const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Act as the noorse god of war Tyr and give advice on ${prompt}`,
    max_tokens: 500,
    temperature: 0.8,
    presence_penalty: 0,
    frequency_penalty: 0,
    });

    const quote = completion.data.choices[0].text;

    res.status(200).json({ quote: quote });
}
