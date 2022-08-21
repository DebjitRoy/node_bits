const express = require("express");
const {
  getAllLaunches,
  addNewLaunch,
  abortMission,
} = require("./launches.controller");

const launchesRouter = express.Router();
launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", addNewLaunch);
launchesRouter.delete("/:flightNumber", abortMission);

module.exports = launchesRouter;
