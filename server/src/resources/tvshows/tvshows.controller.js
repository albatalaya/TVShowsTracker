const TVShow = require("./tvshows.model");

const findMany = async (req, res) => {
  try {
    const docs = await TVShow.find().lean().exec();
    res.status(200).json({ results: docs });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Could not get all the TV Shows" });
  }
};

const createOne = async (req, res) => {
  try {
    const newTVShow = req.body;
    const doc = await TVShow.create(newTVShow);
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Could not create the TV Show" });
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await TVShow.findOne({ _id: id });
    if (!doc) {
      return res.status(404).json({ error: "TV Show not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Could not get the TV Show" });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await TVShow.findOneAndDelete({ _id: id }, { new: true });
    if (!doc) {
      return res.status(404).json({ error: "TV Show not found" });
    }
    res.status(200).json({ results: [doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Could not delete TV Show" });
  }
};

module.exports = {
  createOne,
  findMany,
  findOne,
  deleteOne,
};

//doing manage all possible errors

//done GET all TV Shows
//done GET a TV Show (id_show)
//done POST a TV Show
//done DELETE a TV Show (id_show)
