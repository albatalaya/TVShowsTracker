const { Router } = require("express");

const EpisodesControllers = require("./episodes.controller");

const router = Router();

router.route("/:id/episodes").post(EpisodesControllers.createOne);

router
  .route("/:id_show/episodes/:id")
  .get(EpisodesControllers.findOne)
  .delete(EpisodesControllers.deleteOne)
  .put(EpisodesControllers.updateOne);

module.exports = router;
