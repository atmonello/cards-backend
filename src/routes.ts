import { Router } from "express";

import CardController from "./controllers/CardController";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";

const routes = Router();

routes.post("/sessions", SessionController.store);

routes.get("/cards", CardController.index);
routes.post("/cards", CardController.store);

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);

export default routes;
