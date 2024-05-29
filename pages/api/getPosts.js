import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { sort, filter } = req.query;

    try {
      const client = await clientPromise;
      const db = client.db('scopes');
      const collection = db.collection('posts');

      let query = {};
      if (filter) {
        query = { filter: { $regex: filter, $options: 'i' } };
      }

      let sortOption = {};
      if (sort === 'points') {
        sortOption = { points: -1 };
      } else {
        sortOption = { createdAt: -1 };
      }

      const posts = await collection.find(query).sort(sortOption).toArray();

      res.status(200).json({ success: true, posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ success: false, message: 'Error fetching posts' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
