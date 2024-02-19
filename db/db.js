// db.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://anchalgupta:36zmDEkMIapyaf46@cluster0.wskoljz.mongodb.net/test?retryWrites=true&w=majority&replicaSet=atlas-vnzxvg-shard-0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectDatabase() {
  await client.connect();
  return { client, db: client.db() }; // Resolve the promise with the client and db
}
    