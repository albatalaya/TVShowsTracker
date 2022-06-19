const mongoose = require("mongoose");
const { Schema } = mongoose;

const TVShowSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    episodes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Episode",
      },
    ],
  },
  { timestamps: true }
);

const TVShow = mongoose.model("TVShow", TVShowSchema);

module.exports = TVShow;
