import { Request, Response } from "express";
import Card from "../schemas/Card";
import Logger from "../services/Logger";

export default {
  async index(req: Request, res: Response) {
    const cards = await Card.find();

    if (cards.length <= 0) {
      Logger.error("No cards found");
      return res.status(204).send();
    }

    Logger.log("Cards found");
    return res.json({ message: cards });
  },
  async store(req: Request, res: Response) {
    return res.json({ message: req.body });
  },
};
