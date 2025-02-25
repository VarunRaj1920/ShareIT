import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// Use a global variable to preserve the connection across hot reloads
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  // If already connected, return the connection.
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  // If a connection is cached, return it.
  if (cached.conn) {
    return cached.conn;
  }
  // If no connection promise exists, create one.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongooseInstance) => mongooseInstance);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;