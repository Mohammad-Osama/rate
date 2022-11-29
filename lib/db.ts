import mongoose from 'mongoose';
import { Mongoose } from 'mongoose';

declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error('MONGO_URI not defined in env ');
//if (!MONGODB_DB) throw new Error('MONGODB_DB not defined');

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {conn: null, promise: null}
}

async function clientPromise() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGO_URI}`).then(mongoose => mongoose)
  }

  cached.conn = await cached.promise;
  return cached.conn
}

export default clientPromise;