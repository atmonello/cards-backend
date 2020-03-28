import { Router } from "express";

import AuthMiddleware from "./middlewares/auth";

import CardController from "./controllers/CardController";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";

const routes = Router();

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(AuthMiddleware);

routes.get("/cards", CardController.index);
routes.post("/cards", CardController.store);

routes.get("/users", UserController.index);
routes.put("/users", UserController.update);

export default routes;
