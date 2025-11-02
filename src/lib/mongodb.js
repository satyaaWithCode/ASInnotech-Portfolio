// src/lib/mongodb.js
import mongoose from "mongoose";

// ✅ Load MongoDB URL from environment variable
const MONGODB_URI = process.env.MONGO_DB_URL;

if (!MONGODB_URI) {
  throw new Error(
    "❌ Please define the MONGO_DB_URL environment variable inside .env.local"
  );
}

// ✅ Cache the connection across hot reloads in Next.js
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB using mongoose
 * Ensures single active connection
 */
export async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      dbName: "as_innotech_db",
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log("🚀 MongoDB connected successfully");
      return mongoose;
    }).catch((err) => {
      console.error("❌ MongoDB connection failed:", err.message);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
