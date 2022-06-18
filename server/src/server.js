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

//todo add episodes router

const startServer = async () => {
  await db.connect();
  app.listen(PORT, () => {
    console.log(`TV Shows Tracker API listening on : ${PORT}`);
  });
};

startServer();

/*
DATABASE MODEL  

TV Show: id_show, show_name
Episode: id_episode, episode_name, season_number, episode_number, watched_status, id_show

ENDPOINTS

GET all TV Shows
GET a TV Show (id_show)
POST a TV Show
DELETE a TV Show (id_show)

GET an episode (id_show id_episode)
POST an episode (id_show)
PUT update an episode watched_status (id_show id_episode)
DELETE an episode (id_show id_episode)
*/
