// lib/dbConnect.ts
import mongoose, { Types } from 'mongoose';

// Define the shape of our cached mongoose connection
interface MongooseConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Define the shape of the global object with our mongoose cache
declare global {
    // eslint-disable-next-line no-var
    var mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | undefined;
}

export interface IProject extends Document {
    mainImage: string;
    title: string;
    description: string;
    otherImages: string[];
    createdAt: Date;
    updatedAt: Date;
    id: string;

}

// Interface for the JSON representation
export interface IProjectJSON {
    _id: Types.ObjectId;
    mainImage: string;
    title: string;
    description: string;
    otherImages: string[];
    createdAt: Date;  // ISO date string
    updatedAt: Date;  // ISO date string
    id: string;

}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}