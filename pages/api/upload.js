import aws from 'aws-sdk';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image } = req.body;

    // Decode the base64 image
    const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const type = image.split(';')[0].split('/')[1];

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `uploads/${Date.now()}.${type}`,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    };

    try {
      const { Location } = await s3.upload(params).promise();
      res.status(200).json({ imageUrl: Location });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error uploading image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
