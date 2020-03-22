import mongoose, { Schema, Document } from "mongoose";

enum CardColor {
  White = "White",
  Black = "Black",
}

const CardSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
    unique: true,
  },
  grouping: {
    type: String,
    required: true,
  },
  color: {
    type: CardColor,
    required: true,
  },
  warning: {
    type: Boolean,
    required: true,
  },
});

export interface ICard extends Document {
  content: String;
  grouping: String;
  color: CardColor;
  warning: Boolean;
}

export default mongoose.model<ICard>("Card", CardSchema);
