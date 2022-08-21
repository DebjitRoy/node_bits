const { Worker, workerData, isMainThread } = require("worker_threads");

if (isMainThread) {
  console.log(`Main proc# ${process.pid}`);
  new Worker(__filename, {
    workerData: [7, 6, 2, 3],
  });
  new Worker(__filename, {
    workerData: [1, 3, 9, 6],
  });
} else {
  // in case of cluster each thread for each process
  // in case of worker threads, multiple threads for single process

  // in prod, preferable to use cluster/pm2 than worker threads
  console.log(`Worker proc# ${process.pid}`);
  // parallel execution in worker threads even if sort is blocking operation
  console.log(`workerData:${workerData} sorted:${workerData.sort()}`);
}
