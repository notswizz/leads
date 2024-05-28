import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received POST request to /api/transcribe');
    const { imageUrl } = req.body;
    console.log('Image URL received:', imageUrl);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { type: "text", text: "transcribe the image as if you're feeding it to an AI image generator to reprocess. only output the description" },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      });

      const transcription = response.choices[0].message.content;
      console.log('Transcription received:', transcription);
      res.status(200).json({ transcription });
    } catch (error) {
      console.error('Error transcribing image:', error);
      res.status(500).json({ error: 'Error transcribing image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}