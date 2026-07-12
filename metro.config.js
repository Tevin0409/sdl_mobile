const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// Standalone repo: the @hikdigital/* producers are installed as file:/git deps
// under the sibling repos. Watch the parent dir so Metro picks up their source
// when linked locally, and resolve node_modules from this repo.
const projectRoot = __dirname;
const siblingsRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);
config.watchFolders = [siblingsRoot];
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, "node_modules")];

module.exports = withNativeWind(config, { input: "./global.css" });
