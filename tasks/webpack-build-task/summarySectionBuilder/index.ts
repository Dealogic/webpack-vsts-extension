import tl = require("vsts-task-lib/task");
import path = require("path");
import filenamify = require("filenamify");
import { IWebpackBuildResult } from "../webpackBuild";

const generateWebpackResultFilename = (workingFolder: string, taskDisplayName: string) => {
    const webpackResultFilenamePostfix = ".webpack.result.md";

    return path.join(workingFolder, `${filenamify(taskDisplayName).trim()}${webpackResultFilenamePostfix}`);
};

const createWebpackResultMarkdownFile = (workingFolder: string, webpackJsLocation: string, result: IWebpackBuildResult, taskDisplayName: string): void => {
    console.log("creating the summary section");

    const webpackResultFilename = generateWebpackResultFilename(workingFolder, taskDisplayName);

    const absolutePathOfWebpackJsBinLocation = path.resolve(workingFolder, webpackJsLocation);
    const absolutePathOfWebpackJsLibLocation = path.resolve(path.dirname(absolutePathOfWebpackJsBinLocation), "../lib/webpack");
    const webpack = require(absolutePathOfWebpackJsLibLocation);

    const resultFileContent = webpack.Stats.jsonToString(result);

    tl.writeFile(webpackResultFilename, resultFileContent);

    console.log(`Result file '${webpackResultFilename}' is created.`);
    console.log(`##vso[task.addattachment type=Distributedtask.Core.Summary;name=${taskDisplayName} result;]${webpackResultFilename}`);
};

export {
    createWebpackResultMarkdownFile
};
