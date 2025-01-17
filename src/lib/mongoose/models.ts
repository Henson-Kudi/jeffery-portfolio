import { IProject, IUser } from "@/types";
import mongoose from "mongoose";

export const ProjectSchema = new mongoose.Schema({
    mainImage: String,
    title: String,
    description: String,
    otherImages: [String]
}, {
    timestamps: true,
    id: true
})

export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
}, {
    timestamps: true,
    id: true
})

export const Project = (mongoose.models.Project as mongoose.Model<IProject>) || mongoose.model<IProject>('Project', ProjectSchema)

export const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', UserSchema)

if (!process.env.DATABASE_URL) {
    throw new Error('Please add your MONGODB_URI to .env.local');
}

const MONGODB_URI = process.env.DATABASE_URL;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (!cached) {
        cached = {
            conn: null,
            promise: null
        }
    }

    if (cached?.conn) {
        console.log('Getting from cache')
        return cached?.conn;
    }

    if (!cached?.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        }) as Promise<typeof globalThis.mongoose>;
    }

    try {
        cached.conn = await cached!.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export const initUser = async () => {
    try {
        const found = await User.findOne({ email: 'test@gmail.com', name: 'Jeffery' })
        if (found) {
            return found.toJSON()
        }
        const created = await User.create({ name: 'Jeffery', email: 'test@gmail.com' })

        return created.toJSON()
    } catch (err) {
        console.error(err)
    }
}

export default dbConnect;

