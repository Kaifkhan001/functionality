import mongoose from "mongoose";

export default async function connect(){
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      const connectionRes = mongoose.connection;

      connectionRes.on("connect", () => {
        console.log("MongoDb Connected Successfully");
      });

      connectionRes.on("disconnected", () => {
        console.log("MongoDb diconnected");
      });

      connectionRes.on("error", () => {
        console.log("Error connecting to database");
      })


    } catch (error) {
        console.log("Something went wrong while connecting to database",error);
    }
}