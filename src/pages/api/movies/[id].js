// pages/api/movies/[id].js

import { connectDatabase } from '../../../../db/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;

  try {
    // Connect to MongoDB using the correct function name
    const { db, client } = await connectDatabase();

    // Fetch the movie details based on the movieId
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });

    // Close the MongoDB client
    await client.close();

    if (movie) {
      res.status(200).json({ movie });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
