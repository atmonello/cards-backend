import { Schema, Document, Model, model } from "mongoose";

export interface ICard extends Document {
  createdAt: String;
  content: String;
  grouping: String;
  color: CardColor;
  warning: Boolean;
}

enum CardColor {
  White = "white",
  Black = "black",
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
      default: "default",
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



const Card: Model<ICard> = model<ICard>("Card", CardSchema);


export default Card;