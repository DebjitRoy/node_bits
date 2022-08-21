const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Explortation 101",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2023"),
  target: "Kepler-442 b",
  customers: ["NASA,", "NOAA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

const getLaunches = () => Array.from(launches.values());

const createNewLaunch = (launch) => {
  latestFlightNumber += 1;
  launches.set(latestFlightNumber, {
    ...launch,
    flightNumber: latestFlightNumber,
    customers: ["NASA,", "NOAA"],
    upcoming: true,
    success: true,
  });
};

const abortLaunch = (flightNumber) => {
  const isMissionAvailable = launches.has(parseInt(flightNumber));
  if (!isMissionAvailable) {
    return null;
  }

  //   launches.delete(flightNumber);
  const aborted = {
    ...launches.get(parseInt(flightNumber)),
    upcoming: false,
    success: false,
  };
  launches.set(parseInt(flightNumber), aborted);
  return aborted;
};

module.exports = {
  getLaunches,
  createNewLaunch,
  abortLaunch,
};
