// add.js
"use client";
import { connectDatabase } from '../../../../db/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { title, publishingYear } = req.body;

  // Validation: Check if title and publishingYear are provided
  if (!title || !publishingYear) {
    return res.status(400).json({ message: 'Title and publishingYear are required fields' });
  }

  try {
    // Connect to MongoDB using the correct function name
    const { db, client } = await connectDatabase();

    // Insert the new movie entry
    const result = await db.collection('movies').insertOne({
      title,
      publishingYear: parseInt(publishingYear),
      // Add other fields as needed
    });

    // Close the MongoDB client
    await client.close();

    if (result.acknowledged) {
      res.status(200).json({ message: 'Movie added successfully' });
    } else {
      res.status(500).json({ message: 'Error adding movie: No data returned from the database' });
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
