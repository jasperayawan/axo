import mongoose from "mongoose";

declare global {
    var mongoose: any;
}

const MONGO_URI = process.env.MONGO_URI!;

if(!MONGO_URI){
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands: false
        };
        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            mongoose.modelNames().forEach((modelName) => {
            console.log(`Model registered: ${modelName}`);
            });
            return mongoose;
        })
    }
    try {
        cached.conn = await cached.promise;
      } catch (e) {
        cached.promise = null;
        throw e;
      }
      return cached.conn;
}

export default dbConnect;