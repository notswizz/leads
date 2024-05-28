import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt, filter } = req.body;

    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `heavily emphasize filter: ${filter}. ${prompt}`,
        n: 1,
        size: "1024x1024",
      });

      const imageUrl = response.data[0].url;
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Error generating image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}