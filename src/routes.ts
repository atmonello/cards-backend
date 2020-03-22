import { Router } from "express";
import CardController from "./controllers/CardController";

const routes = Router();

routes.get("/cards", CardController.index);
routes.post("/cards", CardController.store);

export default routes;
