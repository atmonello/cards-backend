import { Request, Response } from "express";
import User from "../schemas/User";
import Logger from "../utils/Logger";

export default {
  async index(req: Request, res: Response) {
    const users = await User.find();

    if (users.length <= 0) {
      return res.status(204).send();
    }

    return res.json(users);
  },
  async store(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Missing field" });
    }

    const repeated = await User.find({ email });

    if (repeated.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create(req.body);

    return res.status(201).json({
      message: "User has been created",
      details: user,
    });
  },
  async update(req: Request, res: Response) {
    const id = req.user;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Incorrect ID parameter" });
    }

    const { email, password, admin, firstName, lastName } = req.body;

    if (!email && !password && !admin && !firstName && !lastName) {
      return res.status(400).json({ message: "Missing field" });
    }

    const user = await User.findByIdAndUpdate(id, req.body);

    if (user) {
      return res.json({ message: "User has been updated", details: user });
    }

    return res.status(400).json({ message: "Could not find user" });
  },
};
