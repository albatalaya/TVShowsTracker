const Episode = require("./episodes.model");

const findMany = async (req, res) => {
  try {
    const docs = await Episode.find().lean().exec();
    res.status(200).json({ results: docs });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Could not get all the Episodes" });
  }
};

const createOne = async (req, res) => {
  try {
    const newEpisode = req.body;
    const doc = await Episode.create(newEpisode);
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Could not create the Episode" });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Episode.findOne({ _id: id });
    if (!doc) {
      return res.status(404).json({ error: "Episode not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Could not get the Episode" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Episode.findOneAndDelete({ _id: id }, { new: true });
    if (!doc) {
      return res.status(404).json({ error: "Episode not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Could not delete the Episode" });
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Episode.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Could not delete the Episode" });
  }
};

module.exports = {
  createOne,
  findMany,
  findOne,
  deleteOne,
  updateOne,
};

//doing manage all possible errors

//temp GET all episodes
//doing PUT update an episode watched_status (id_show id_episode)
