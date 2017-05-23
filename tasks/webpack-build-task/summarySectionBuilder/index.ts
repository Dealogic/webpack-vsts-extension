import tl = require("vsts-task-lib/task");
import path = require("path");
import os = require("os");
import prettyBytes = require("pretty-bytes");
import filenamify = require("filenamify");
import { IWebpackBuildResult } from "../webpackBuild";

const getSizeString = (size: number) => {
    const sizeAsString = prettyBytes(size);

    return sizeAsString.replace(" B", " bytes");
};

const generateWebpackResultFilename = (workingFolder: string, taskDisplayName: string) => {
    const webpackResultFilenamePostfix = ".webpack.result.md";

    return path.join(workingFolder, `${filenamify(taskDisplayName).trim()}${webpackResultFilenamePostfix}`);
};

const createWebpackResultMarkdownFile = (workingFolder: string, result: IWebpackBuildResult, taskDisplayName: string): void => {
    console.log("creating the summary section");

    let resultFileContent = `Hash: ${result.hash}  ${os.EOL}`;
    resultFileContent += `Version: ${result.version}  ${os.EOL}`;
    resultFileContent += `Time: ${result.time}ms  ${os.EOL}  ${os.EOL}`;

    resultFileContent += `Asset | Size | Chunks | | Chunk Names${os.EOL}`;
    resultFileContent += `---: | ---: | ---: | ---: | ---${os.EOL}`;

    if (result.assets) {
        for (let asset of result.assets) {
            resultFileContent += `${asset.name}|${getSizeString(asset.size)}|${asset.chunks.join(", ")}`;
            resultFileContent += `|${asset.emitted ? "[emitted]" : ""}|${asset.chunkNames.join(", ")}${os.EOL}`;
        }
    }

    let hiddenModulesCount = 0;

    if (result.chunks) {
        for (let chunk of result.chunks) {
            hiddenModulesCount += chunk.modules.length;
        }
    }

    resultFileContent += `\t+ ${hiddenModulesCount} hidden modules  ${os.EOL}`;

    for (let warning of result.warnings) {
        warning = warning.replace("\n", `  ${os.EOL}`);
        resultFileContent += `WARNING IN ${warning}  ${os.EOL}`;
    }

    for (let error of result.errors) {
        error = error.replace("\n", `  ${os.EOL}`);
        resultFileContent += `ERROR IN ${error}  ${os.EOL}`;
    }

    const webpackResultFilename = generateWebpackResultFilename(workingFolder, taskDisplayName);

    tl.writeFile(webpackResultFilename, resultFileContent);

    console.log(`Result file '${webpackResultFilename}' is created.`);
    console.log(`##vso[task.addattachment type=Distributedtask.Core.Summary;name=${taskDisplayName} result;]${webpackResultFilename}`);
};

export {
    createWebpackResultMarkdownFile
};
