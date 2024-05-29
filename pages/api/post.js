import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageUrl, generatedImageUrl, transcription, filter } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('scopes');
      const collection = db.collection('posts');

      const result = await collection.insertOne({
        imageUrl,
        generatedImageUrl,
        transcription,
        filter,
        points: 1, // Initialize points to 1
        createdAt: new Date(),
      });

      res.status(200).json({ success: true, message: 'Post created successfully', postId: result.insertedId });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ success: false, message: 'Error creating post' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
