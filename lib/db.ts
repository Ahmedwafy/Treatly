import mongoose from "mongoose";

const connectDb = async () => {
  // if the connection is already established, return
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    // check if the environment variable is set
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables"
      );
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDb;
