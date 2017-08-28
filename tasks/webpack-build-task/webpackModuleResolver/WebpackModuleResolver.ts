import * as path from "path";

const resolveWebpackModule = (workingFolder: string, webpackModuleLocation: string) => {
    return webpackModuleLocation && webpackModuleLocation !== "undefined" && webpackModuleLocation !== "webpack"
        ? require(path.resolve(workingFolder, webpackModuleLocation))
        : require(path.resolve(workingFolder, "node_modules", "webpack"));
};

const resolveWebpackConfig = (workingFolder: string, webpackConfigLocation: string) => {
    const webpackConfig = require(path.resolve(workingFolder, webpackConfigLocation));

    if (webpackConfig.default) {
        return webpackConfig.default;
    } else {
        return webpackConfig;
    }
};

export {
    resolveWebpackModule,
    resolveWebpackConfig
};
