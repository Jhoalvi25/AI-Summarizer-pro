import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;

if (!uri) throw new Error("MONGODB_URI is required");
const cache: { conn?: typeof mongoose } = {};

export async function connectDB() {
  if (cache.conn) return cache.conn;
  const conn = await mongoose.connect(uri);
  cache.conn = conn;
  return conn;
}
