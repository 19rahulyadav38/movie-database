// pages/api/movies/edit.js

import { connectDatabase } from '../../../../../db/db';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { id } = req.query;
  const { title, publishingYear } = req.body;

  // Check if title and publishingYear are present and not empty
  if (!title || !publishingYear) {
    return res.status(400).json({ message: 'Title and publishingYear are required fields.' });
  }

  try {
    // Connect to MongoDB using the correct function name
    const { db, client } = await connectDatabase();

    // Update the movie details based on the movieId
    const result = await db.collection('movies').updateOne(
      { _id: new ObjectId(id) }, // Use 'new' keyword here
      { $set: { title, publishingYear } }
    );

    // Close the MongoDB client
    await client.close();

    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'Movie updated successfully' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
