import * as path from "path";

const resolveTsNodeModule = (workingFolder: string, tsNodeModuleLocation: string) => {
    try {
        const tsNodeModule = tsNodeModuleLocation && tsNodeModuleLocation !== "undefined" && tsNodeModuleLocation !== "ts-node"
            ? require(path.resolve(workingFolder, tsNodeModuleLocation))
            : require(path.resolve(workingFolder, "node_modules", "ts-node"));

        if (tsNodeModule.default) {
            return tsNodeModule.default;
        } else {
            return tsNodeModule;
        }
    } catch (error) {
        return null;
    }
};

const resolveTsNodeOptions = (workingFolder: string, tsNodeOptionsLocation: string) => {
    if (!tsNodeOptionsLocation) {
        return null;
    }

    const tsNodeOptions = require(path.resolve(workingFolder, tsNodeOptionsLocation));

    if (tsNodeOptions.default) {
        return tsNodeOptions.default;
    } else {
        return tsNodeOptions;
    }
};

export {
    resolveTsNodeModule,
    resolveTsNodeOptions
};
