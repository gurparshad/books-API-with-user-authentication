import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    cover: {type: Buffer, required: false},
    author: {type: String, required: true},
    publicationDate: {type: String, required: true},
    type: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, required: true}
});

export interface Book extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    cover: Buffer;
    author: string;
    publicationDate: Date;
    type: string;
    
}