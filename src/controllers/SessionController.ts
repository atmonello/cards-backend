import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import auth from "../config/auth";

import User, { comparePassword } from "../schemas/User";

import Logger from "../services/Logger";

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

    return res.json({
      message: "Password OK",
      details: {
        user: {
          id,
          email: userEmail,
          firstName,
        },
        token: jwt.sign({ id }, auth.secret, { expiresIn: auth.expires }),
      },
    });
  },
};
