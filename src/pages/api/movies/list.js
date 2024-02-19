// pages/api/list.js
import { connectDatabase } from '../../../../db/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    // Connect to MongoDB
    const { client, db } = await connectDatabase();

    // Fetch movies from the 'movies' collection
    const movies = await db.collection('movies').find().toArray();

    // Close the MongoDB client
    await client.close();

    res.status(200).json({ movies });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
