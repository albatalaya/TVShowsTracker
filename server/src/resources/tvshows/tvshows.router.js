const { Router } = require("express");

const TVShowsControllers = require("./tvshows.controller");

const router = Router();

router
  .route("/")
  .get(TVShowsControllers.findMany)
  .post(TVShowsControllers.createOne);

router
  .route("/:id")
  .get(TVShowsControllers.findOne)
  .delete(TVShowsControllers.deleteOne);

router.route("/:id/episodes").get(TVShowsControllers.findEpisodes);

module.exports = router;
