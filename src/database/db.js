import mongoose from "mongoose";

const conntectToDb = async (req, res) => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDb connection successfull.");
  } catch (err) {
    console.error("MongoDb connection failed:", err);
  }
};

export default conntectToDb;
