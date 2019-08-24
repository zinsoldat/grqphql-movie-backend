const server = require("./server");
// const process = require("process");

server.start({
  port: process.env["PORT"] || 4000,
});