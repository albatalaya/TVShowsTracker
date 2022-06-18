const { Router } = require("express");

const EpisodesControllers = require("./episodes.controller");

const router = Router();

router
  .route("/")
  .get(EpisodesControllers.findMany)
  .post(EpisodesControllers.createOne);

router
  .route("/:id")
  .get(EpisodesControllers.findOne)
  .delete(EpisodesControllers.deleteOne)
  .put(EpisodesControllers.updateOne);

module.exports = router;
