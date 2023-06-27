import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client = new MongoClient(uri, options);
let clientPromise;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}
// async function testDBConnection() {
//   const client = new MongoClient(uri, options);

//   try {
//     // Connect to the database with the specified name
//     await client.connect();
//     const db = client.db("questadmin");

//     // Check if the connection was successful
//     const serverStatus = await db.admin().ping();
//     console.log(`MongoDB connection   successful:`, serverStatus.ok === 1);
//   } catch (error) {
//     console.error(`MongoDB connection  error:`, error);
//   } finally {
//     // Close the connection
//     await client.close();
//   }
// }

// // Call the testDBConnection function to check the database connection
// testDBConnection();

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    console.log("Successfully connected to MongoDB!");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default clientPromise;
