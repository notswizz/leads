// pages/api/generate-image.js
import OpenAI from 'openai';
import aws from 'aws-sdk';
import fetch from 'node-fetch';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60000, // Set a longer timeout (60 seconds)
});

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt, filter } = req.body;

    const generateImage = async (retryCount = 0) => {
      try {
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: `heavily emphasize filter: ${filter}. ${prompt}`,
          n: 1,
          size: "1024x1024",
        });

        const imageUrl = response.data[0].url;

        // Fetch the image data from the OpenAI generated URL
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.buffer();

        // Upload the image to S3
        const params = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `uploads/${Date.now()}.png`, // Save the image with .png extension
          Body: imageBuffer,
          ContentType: 'image/png',
        };

        const { Location } = await s3.upload(params).promise();

        res.status(200).json({ imageUrl: Location });
      } catch (error) {
        if (retryCount < 3) {
          console.warn(`Retrying image generation (${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
          await generateImage(retryCount + 1);
        } else {
          console.error('Error generating image:', error);
          res.status(500).json({ error: 'Error generating image', message: error.message });
        }
      }
    };

    await generateImage();
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
