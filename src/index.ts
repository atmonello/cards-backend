import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import routes from "./routes";
import dbConfig from "./config/db";

import Logger from "./utils/Logger";

const port = 3333;

const app = express();

mongoose.connect(dbConfig.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port);
Logger.log(`App rodando na porta ${port}`);
