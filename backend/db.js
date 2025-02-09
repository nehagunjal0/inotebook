import mongoose from "mongoose";
const mongoURI = "mongodb://localhost:27017";

async function connectToMongo() {
  const p = await mongoose.connect(mongoURI);
  console.log("Connected to DB successfully!");
}

export default connectToMongo;
