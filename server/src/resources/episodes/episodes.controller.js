const Episode = require("./episodes.model");
const TVShow = require("../tvshows/tvshows.model");

const createOne = async (req, res) => {
  try {
    const { id } = req.params;
    const newEpisode = req.body;
    const episode = await Episode.create(newEpisode);
    const show = await TVShow.findOneAndUpdate(
      { _id: id },
      { $push: { episodes: episode._id } },
      { new: true }
    );
    if (!show) {
      res.status(404).json({ error: "TV Show does not exist" });
      console.error("TV Show does not exist");
      return;
    }
    res.status(200).json({ results: [episode] });
  } catch (e) {
    const [code, message] =
      e && e.code === 11000
        ? [400, "Episode already exists"]
        : [500, "Could not create the Episode"];
    res.status(code).json({ error: message });
    console.error(message);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findOne({ _id: id });
    if (!episode) {
      return notExistError(res);
    }
    res.status(200).json({ results: [episode] });
  } catch (e) {
    couldNotError(res, "get");
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id_show, id } = req.params;
    const show = await TVShow.findOneAndUpdate(
      { _id: id_show },
      { $pull: { episodes: id } },
      { new: true }
    );
    const episode = await Episode.findOneAndDelete({ _id: id }, { new: true });
    if (!episode) {
      return notExistError(res);
    }
    if (!show) {
      res.status(404).json({ error: "TV Show does not exist" });
      console.error("TV Show does not exist");
    }
    res.status(200).json({ results: [show] });
  } catch (e) {
    couldNotError(res, "delete");
  }
};

const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );
    if (!episode) {
      return notExistError(res);
    }
    res.status(200).json({ results: [episode] });
  } catch (e) {
    couldNotError(res, "update");
  }
};

module.exports = {
  createOne,
  findOne,
  deleteOne,
  updateOne,
};

function notExistError(res) {
  res.status(404).json({ error: "Episode does not exist" });
  console.error("Episode does not exist");
}

function couldNotError(res, action) {
  res.status(500).json({ error: `Could not ${action} the Episode` });
  console.error(`Could not ${action} the Episode`);
}
