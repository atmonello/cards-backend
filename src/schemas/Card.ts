import mongoose, { Schema, Document } from "mongoose";

enum CardColor {
  White = "White",
  Black = "Black",
}

const CardSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
      unique: true,
    },
    grouping: {
      type: String,
      required: false,
      default: "Default",
    },
    color: {
      type: CardColor,
      required: true,
    },
    warning: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export interface ICard extends Document {
  createdAt: String;
  content: String;
  grouping: String;
  color: CardColor;
  warning: Boolean;
}

export default mongoose.model<ICard>("Card", CardSchema);
