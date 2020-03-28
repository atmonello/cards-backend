import { Request, Response } from "express";
import Card from "../schemas/Card";
import Logger from "../utils/Logger";
import {shuffleArray} from "../utils/Functions"

export default {
  async index(req: Request, res: Response) {
    const { color, quantity } = req.query;

    let cards:any[] = [];

    const totalCards = await Card.find();

    if (color) {
      const colorCards = totalCards.filter(card => card.color === color);

      if (quantity) {
        const cardsQty = Number(quantity);
        const filter = shuffleArray(colorCards).slice(0, cardsQty);
        cards = [...cards, filter];
      } else {
        cards = [...cards, colorCards];
      }
    } else if (quantity) {
      const cardsQty = Number(quantity);
      const filter = shuffleArray(totalCards).slice(0, cardsQty);
      cards = [...cards, filter];
    } else {
      cards = [...cards, totalCards];
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
