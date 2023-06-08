import mongoose from "mongoose";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

export const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB", err));
};

export default connectToMongo;
