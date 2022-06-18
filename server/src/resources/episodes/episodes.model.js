const mongoose = require("mongoose");
const { Schema } = mongoose;

const EpisodeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    season: {
      type: Number,
      required: true,
    },
    episode: {
      type: Number,
      required: true,
    },
    watched: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Episode = mongoose.model("Episode", EpisodeSchema);

module.exports = Episode;

//Episode: id_episode, episode_name, season_number, episode_number, watched_status, id_show
