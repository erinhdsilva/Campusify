import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI);
};

export default dbConnect;
