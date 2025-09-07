
// export const ConnectDB = async ()=>{
//     await mongoose.connect('mongodb+srv://thrift:bibibaboo@cluster1.3pzossj.mongodb.net/thrift')
//     console.log("DB connected")
// }

// First checks if there is a cached connection (cached.conn).
// If not, checks if a connection attempt (cached.promise) is already in progress.
// If not, starts a new connection using Mongoose.
// Caches the connection and reuses it for future calls (important in serverless environments).
// Returns the established connection.

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global cached connection for Next.js
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if no promise exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      family: 4, // Use IPv4, skip trying IPv6
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    console.log('Connecting to MongoDB...');
    cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/pastelthrifts`, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        // Reset the promise so it can be retried
        cached.promise = null;
        throw error;
      });
  }

    cached.conn = await cached.promise;
    return cached.conn;
  
}

export default connectDB;