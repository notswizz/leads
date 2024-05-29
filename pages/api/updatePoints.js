import clientPromise from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { postId, delta } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('scopes');
      const collection = db.collection('posts');

      const result = await collection.updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { points: delta } }
      );

      if (result.modifiedCount > 0) {
        res.status(200).json({ success: true, message: 'Points updated successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Post not found' });
      }
    } catch (error) {
      console.error('Error updating points:', error);
      res.status(500).json({ success: false, message: 'Error updating points' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
