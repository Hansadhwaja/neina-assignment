import mongoose from "mongoose";

const mongoUri=process.env.MONGO_URI;
console.log(mongoUri);


if (!mongoUri) {
  console.error("MongoDB URI not defined in environment variables");
  process.exit(1);
}

export const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error: ", error);
    process.exit(1);
  }
};