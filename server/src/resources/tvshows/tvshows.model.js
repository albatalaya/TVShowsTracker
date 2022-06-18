const mongoose = require("mongoose");
const { Schema } = mongoose;

const TVShowSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const TVShow = mongoose.model("TVShow", TVShowSchema);

module.exports = TVShow;
