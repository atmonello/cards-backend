import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

import routes from "./routes";
import dbConfig from "./config/db";

import Logger from "./utils/Logger";

const env = process.env.NODE_ENV?.trim();

const result = dotenv.config({
  path: path.resolve(__dirname, "..", `.env.${process.env.NODE_ENV}`)
});

const mongo = new dbConfig({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const port = process.env.APP_PORT;

const app = express();

mongoose.connect(mongo.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port);
Logger.log(`App running in ${env} mode on port ${port}`);
