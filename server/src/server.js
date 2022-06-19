const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config");
const db = require("./db");

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const TVShowsRouter = require("./resources/tvshows/tvshows.router");
app.use("/tvshows", TVShowsRouter);

const EpisodesRouter = require("./resources/episodes/episodes.router");
app.use("/tvshows", EpisodesRouter);

const startServer = async () => {
  await db.connect();
  app.listen(PORT, () => {
    console.log(`TV Shows Tracker API listening on : ${PORT}`);
  });
};

startServer();
