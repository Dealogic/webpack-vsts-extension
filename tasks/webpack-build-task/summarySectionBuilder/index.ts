import tl = require("vsts-task-lib/task");
import path = require("path");
import filenamify = require("filenamify");
import { IWebpackBuildResult } from "../webpackBuild";

const generateWebpackResultFilename = (workingFolder: string, taskDisplayName: string) => {
    const webpackResultFilenamePostfix = ".webpack.result.md";

    return path.join(workingFolder, `${filenamify(taskDisplayName).trim()}${webpackResultFilenamePostfix}`);
};

const createWebpackResultMarkdownFile = (workingFolder: string, webpackJsLocation: string, result: IWebpackBuildResult, taskDisplayName: string): void => {
    try {
        console.log("creating the summary section");

        const webpackResultFilename = generateWebpackResultFilename(workingFolder, taskDisplayName);

        const absolutePathOfWebpackJsLocation = path.resolve(workingFolder, webpackJsLocation);
        const absolutePathOfStatsJsLocation = path.resolve(path.dirname(absolutePathOfWebpackJsLocation), "../lib/Stats");
        const Stats = require(absolutePathOfStatsJsLocation);

        const resultFileContent = Stats.jsonToString(result);

        tl.writeFile(webpackResultFilename, resultFileContent);

        console.log(`Result file '${webpackResultFilename}' is created.`);
        console.log(`##vso[task.addattachment type=Distributedtask.Core.Summary;name=${taskDisplayName} result;]${webpackResultFilename}`);
    } catch(error) {
        console.log("Couldn't create the summary section, because of the following error: ");
        console.log(error);
    }
};

export {
    createWebpackResultMarkdownFile
};
