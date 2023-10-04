import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { drivers?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGODB_URI ?? ""
  );

  await client.connect();

  const db: mongoDB.Db = client.db("f1db");

  const driverCollection: mongoDB.Collection = db.collection("driver");

  collections.drivers = driverCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${driverCollection.collectionName}`
  );
}
