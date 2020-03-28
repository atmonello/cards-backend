import { Request, Response } from "express";
import jwt, {Secret} from "jsonwebtoken";

import Auth, {ExpireLenght} from "../config/auth";

import User, { comparePassword } from "../schemas/User";

export default {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "User not found" });

    const validate = await comparePassword(email, password);

    if (!validate) {
      return res.status(401).json({ message: "Password does not match" });
    }

    const { id, email: userEmail, firstName } = user;

    const auth = new Auth({
      expires: ExpireLenght.week,
      secret: process.env.AUTH_SECRET as Secret
    });

    if (auth.secret) {
      return res.json({
        message: "Password OK",
        details: {
          user: {
            id,
            email: userEmail,
            firstName,
          },
          token: jwt.sign({ id }, auth.secret, {
            expiresIn: auth.expires
          }),
        },
      });
    } else {
      return res.status(500).json({ message: "The server could not verify the token" });
    }
  },
};
