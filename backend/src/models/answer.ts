import mongoose, { Schema, Document } from "mongoose";

interface IAnswer extends Document {
  numbers: number[];
  solutions: string[];
}

const answerSchema: Schema = new Schema({
  numbers: { type: [Number], required: true },
  solutions: { type: [String], required: true },
});

const Answer = mongoose.model<IAnswer>("Answer", answerSchema);

export default Answer;
