import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (!connection.isConnected) {
    return;
  }

  await mongoose.disconnect();
  connection.isConnected = false;
}

export { connect, disconnect };
