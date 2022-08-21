const {
  getLaunches,
  createNewLaunch,
  abortLaunch,
} = require("../../models/launches.model");

const getAllLaunches = (req, res) => {
  return res.status(200).json(getLaunches());
};

const addNewLaunch = (req, res) => {
  const launch = req.body;
  const { mission, rocket, launchDate, target } = launch;
  if (
    !mission?.length ||
    !rocket?.length ||
    !launchDate?.length ||
    !target?.length
  ) {
    return res.status(500).json({ error: "Invalid Request" });
  }
  const launchFomattedDate = new Date(launch.launchDate);
  if (isNaN(launchFomattedDate)) {
    return res.status(500).json({ error: "Invalid Format" });
  }
  const updatedLaunch = { ...launch, launchDate: launchFomattedDate };
  createNewLaunch(updatedLaunch);
  return res.status(201).json(updatedLaunch);
};

const abortMission = (req, res) => {
  const { flightNumber } = req.params;
  console.log("FT No", flightNumber);
  if (!flightNumber) {
    return res.status(500).json({ error: "Invalid Request" });
  }
  const aborted = abortLaunch(parseInt(flightNumber));
  if (aborted) {
    return res.status(201).json(aborted);
  } else {
    return res.status(500).json({ error: "Request failed" });
  }
};

module.exports = { getAllLaunches, addNewLaunch, abortMission };
