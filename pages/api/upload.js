import aws from 'aws-sdk';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired size limit here
    },
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received POST request to /api/upload');
    const { image } = req.body;
    console.log('Image received:', image.slice(0, 30) + '...'); // Print the first 30 characters of the image data

    // Decode the base64 image
    const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const type = 'png'; // Force the image type to be PNG
    console.log('Image type:', type);

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `uploads/${Date.now()}.png`, // Save the image with .png extension
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    };

    try {
      const { Location } = await s3.upload(params).promise();
      console.log('Image uploaded to S3:', Location);
      res.status(200).json({ imageUrl: Location });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Error uploading image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
