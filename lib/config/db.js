import mongoose from "mongoose";

// export const ConnectDB = async ()=>{
//     await mongoose.connect('mongodb+srv://thrift:bibibaboo@cluster1.3pzossj.mongodb.net/thrift')
//     console.log("DB connected")
// }

let cached = global.mongoose
// First checks if there is a cached connection (cached.conn).
// If not, checks if a connection attempt (cached.promise) is already in progress.
// If not, starts a new connection using Mongoose.
// Caches the connection and reuses it for future calls (important in serverless environments).
// Returns the established connection.


if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

async function ConnectDB() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: false
        }

        cached.promise= mongoose.connect(`${process.env.MONGODB_URI}/pastelthrifts`,opts).then(mongoose=>{})
        return mongoose

    }

    cached.conn = await cached.promise
    return cached.conn

    
}

export default ConnectDB