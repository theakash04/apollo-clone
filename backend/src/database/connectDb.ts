import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Doctor } from "./mongo";
import { sampleDoctor } from "./sampleDoc";

let isMemoryDb = false;

export default async function runMongo(): Promise<boolean> {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (mongoUri) {
      console.log("Connecting to external MongoDB URI...");
      await mongoose.connect(mongoUri);
    } else {
      console.log("No MONGO_URI provided. Starting in-memory MongoDB...");
      const mongoServer = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          dbName: "doctor-db",
        },
      });
      const memoryUri = mongoServer.getUri();
      isMemoryDb = true;
      await mongoose.connect(memoryUri);
    }

    console.log("MongoDB connected successfully.");

    if (isMemoryDb) {
      await insertSampleData();
    }

    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
}

async function insertSampleData() {
  try {
    await Doctor.insertMany(sampleDoctor);
    console.log("Sample doctor data inserted into in-memory MongoDB.");
  } catch (err: unknown) {
    console.error("Error inserting sample data:", err);
  }
}
