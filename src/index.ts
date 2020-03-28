import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

import routes from "./routes";
import dbConfig from "./config/db";

import Logger from "./utils/Logger";

const env = process.env.NODE_ENV?.trim();

dotenv.config({
  path: path.resolve(__dirname, "..", `.env.${process.env.NODE_ENV}`)
});

Logger.log(`ENV: ${env}`);

const port = process.env.APP_PORT;

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
