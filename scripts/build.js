const webpack = require("webpack");
const { base } = require("./base");
const { merge } = require("./util");
const rimraf = require("rimraf");

const build = {
  mode: "production",
  devtool: null
};

const doBuild = async () => {
  rimraf.sync("build", ["rmdir"]);
  webpack(merge(build, base), (err) => {
    err && console.log(err)
    process.exit();
  });
};

doBuild();
