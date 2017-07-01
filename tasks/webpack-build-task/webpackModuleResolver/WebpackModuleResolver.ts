import * as path from "path";

const resolveWebpackModule = (workingFolder: string, webpackModuleLocation: string) => {
    return webpackModuleLocation && webpackModuleLocation !== "webpack"
        ? require(path.resolve(workingFolder, webpackModuleLocation))
        : require(path.resolve(workingFolder, "node_modules", "webpack"));
};

const resolveWebpackConfig = (workingFolder: string, webpackConfigLocation: string) => {
    return require(path.resolve(workingFolder, webpackConfigLocation));
};

export {
    resolveWebpackModule,
    resolveWebpackConfig
};
