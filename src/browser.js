const api = require("./api");
const config = require("./config");
const utils = require("./utils");

const steem = {
  api,
  config,
  utils
};

if (typeof window !== "undefined") {
  window.steem = steem;
}

if (typeof global !== "undefined") {
  global.steem = steem;
}

exports = module.exports = steem;
