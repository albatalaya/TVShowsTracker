const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Successful Request" });
});

app.listen(1234, () => {
  console.log("Forums API listening on : 1234");
});

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
