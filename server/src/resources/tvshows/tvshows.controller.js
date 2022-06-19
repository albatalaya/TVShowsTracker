const Episode = require("../episodes/episodes.model");
const TVShow = require("./tvshows.model");

const findMany = async (req, res) => {
  try {
    const shows = await TVShow.find().lean().exec();
    res.status(200).json({ results: shows });
  } catch (e) {
    couldNotError(res, "get");
  }
};

const createOne = async (req, res) => {
  try {
    const newTVShow = req.body;
    const show = await TVShow.create(newTVShow);
    res.status(200).json({ results: [show] });
  } catch (e) {
    const [code, message] =
      e && e.code === 11000
        ? [400, "TV Show already exists"]
        : [500, "Could not create the TV Show"];
    res.status(code).json({ error: message });
    console.error(message);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await TVShow.findOne({ _id: id });
    if (!show) {
      return notExistError(res);
    }
    res.status(200).json({ results: [show] });
  } catch (e) {
    couldNotError(res, "get");
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const show = await TVShow.findOneAndDelete({ _id: id }, { new: true });
    let episodesIds = show.episodes.map((c) => c._id); //delete children episodes
    console.log(episodesIds);
    const ep = await Episode.deleteMany({
      _id: {
        $in: episodesIds,
      },
    });

    if (!show) {
      return notExistError(res);
    }

    res.status(200).json({ results: [show] });
  } catch (e) {
    couldNotError(res, "delete");
  }
};

const findEpisodes = async (req, res) => {
  try {
    const { id } = req.params;
    const episodes = await TVShow.findOne({ _id: id }).populate({
      path: "episodes",
      options: { sort: [{ season: "asc", episode: "asc" }] },
    });
    if (!episodes) {
      return notExistError(res);
    }
    res.status(200).json({ results: [episodes] });
  } catch (e) {
    res
      .status(500)
      .json({ error: `Could not get the Episodes of this TV Show` });
    console.error(`Could not get the Episodes of this TV Show`);
  }
};

module.exports = {
  createOne,
  findMany,
  findOne,
  deleteOne,
  findEpisodes,
};

function notExistError(res) {
  res.status(404).json({ error: "TV Show does not exist" });
  console.error("TV Show does not exist");
}

function couldNotError(res, action) {
  res.status(500).json({ error: `Could not ${action} the TV Show` });
  console.error(`Could not ${action} the TV Show`);
}
