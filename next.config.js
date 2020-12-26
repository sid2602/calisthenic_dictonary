const path = require("path");
require("dotenv").config();

module.exports = {
  env: {
    API_URL: process.env.API_URL,
  },
  onDemandEntries: {
    maxInactiveAge: 35 * 1000,
    pagesBufferLength: 5,
  },
  target: "serverless",
  webpack: (config, options) => {
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["assets"] = path.join(__dirname, "assets");
    config.resolve.alias["public"] = path.join(__dirname, "public");
    config.resolve.alias["types"] = path.join(__dirname, "types");

    return config;
  },
};
