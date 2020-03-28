import { Request, Response } from "express";
import Card from "../schemas/Card";
import Logger from "../services/Logger";

export default {
  async index(req: Request, res: Response) {
    const { color } = req.query;

    let cards;

    if (color) {
      cards = await Card.find({ color });
    } else {
      cards = await Card.find();
    }

    if (cards.length <= 0) {
      Logger.error("No cards found");
      return res.status(204).send();
    }

    Logger.log("Cards found");
    return res.json({ message: cards });
  },
  async store(req: Request, res: Response) {
    const { content, color } = req.body;

    if (!content || !color) return res.status(400).json({
      message: "Missing field",
    });

    const repeated = await Card.findOne({ content });

    if (repeated) {
      return res.status(400).json({
        message: "Card already exists",
        // details: repeated,
        details: { id: repeated.id, created: repeated.createdAt },
      });
    }

    const create = await Card.create(req.body);

    return res.status(201).json({ message: create });
  },
};
