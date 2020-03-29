import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcryptjs";
import Logger from "../utils/Logger";

export interface IUser extends Document {
  email: string;
  password: string;
  admin: boolean;
  firstName: string;
  lastName: string;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    admin: {
      type: Boolean,
      required: false,
      default: false,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const User: Model<IUser> = model<IUser>("User", UserSchema);

export const comparePassword = async function(email: string, password: string) {
  const user = await User.findOne({ email }).select("password");

  try {
    if (user) {
      const validate = await bcrypt.compare(password, user.password);
      return validate;
    }
  } catch (err) {
    Logger.error(err);
  }
};

export default User;
