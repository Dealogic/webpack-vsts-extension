import tl = require("vsts-task-lib/task");
import { build } from "./WebpackBuild";
import { IWebpackBuildResult } from "./IWebpackBuildResult";
import os = require("os");
import prettyBytes = require("pretty-bytes");
import filenamify = require("filenamify");
import path = require("path");

const getSizeString = (size: number) => {
    const sizeAsString = prettyBytes(size);

    return sizeAsString.replace(" B", " bytes");
};

const generateWebpackResultFilename = (workingFolder: string, taskDisplayName: string) => {
    let webpackResultFilename: string = path.join(workingFolder, `${filenamify(taskDisplayName).trim()}.webpack.result.md`);

    let counter = 0;
    while (tl.exist(webpackResultFilename)) {
        counter++;
        webpackResultFilename = generateWebpackResultFilename(workingFolder, `${taskDisplayName}${counter}`);
    }

    return webpackResultFilename;
};

const createWebpackResultMarkdownFile = (workingFolder: string, result: IWebpackBuildResult, taskDisplayName: string): void => {
    let resultFileContent = `Hash: ${result.hash}  ${os.EOL}`;
    resultFileContent += `Version: ${result.version}  ${os.EOL}`;
    resultFileContent += `Time: ${result.time}ms  ${os.EOL}  ${os.EOL}`;

    resultFileContent += `Asset | Size | Chunks | | Chunk Names${os.EOL}`;
    resultFileContent += `---: | ---: | ---: | ---: | ---${os.EOL}`;

    for (let asset of result.assets) {
        resultFileContent += `${asset.name}|${getSizeString(asset.size)}|${asset.chunks.join(", ")}|${asset.emitted ? "[emitted]" : ""}|${asset.chunkNames.join(", ")}${os.EOL}`;
    }

    let hiddenModulesCount = 0;

    for (let chunk of result.chunks) {
        hiddenModulesCount += chunk.modules.length;
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

    console.log(`##vso[task.addattachment type=Distributedtask.Core.Summary;name=${taskDisplayName} result;]${webpackResultFilename}`);
};

const convertMessageToSingleLine = (message: string): string => {
    let messageParts = message.split("\n");

    for (let index = 0; index < messageParts.length; index++) {
        messageParts[index] = messageParts[index].trim();
    }

    return messageParts.join("; ");
};

async function run(): Promise<void> {
    let taskDisplayName = tl.getVariable("task.displayname");

    if (!taskDisplayName) {
        taskDisplayName = "webpack";
    }

    console.log(taskDisplayName);

    try {
        const workingFolder = tl.getPathInput("workingFolder", false);
        const webpackJsLocation = tl.getInput("webpackJsLocation", true);
        const webpackArguments = tl.getInput("arguments", false);

        const result = build(workingFolder, webpackJsLocation, webpackArguments);

        let hasErrors = result && result.errors && result.errors.length > 0;
        let hasWarnings = result && result.warnings && result.warnings.length > 0;

        if (hasErrors) {
            tl.setResult(tl.TaskResult.Failed, `${taskDisplayName} failed`);
        } else if (hasWarnings) {
            tl.warning(`${taskDisplayName} partially succeeded`);
        } else {
            console.log(`${taskDisplayName} succeeded`);
        }

        if (hasErrors) {
            for (let error of result.errors) {
                error = `${taskDisplayName}: ${convertMessageToSingleLine(error)}`;

                tl.error(error);
            }
        }

        if (hasWarnings) {
            for (let warning of result.warnings) {
                warning = `${taskDisplayName}: ${convertMessageToSingleLine(warning)}`;

                tl.warning(warning);
            }
        }

        if (hasWarnings && !hasErrors) {
            console.log("##vso[task.complete result=SucceededWithIssues;]DONE");
        }

        createWebpackResultMarkdownFile(workingFolder, result, taskDisplayName);
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, `${taskDisplayName} failed`);
        tl.error(err.message);
    }
}

run();
