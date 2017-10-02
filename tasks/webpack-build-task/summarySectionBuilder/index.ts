import tl = require("vsts-task-lib/task");
import path = require("path");
import filenamify = require("filenamify");
import { IWebpackCompilationResult } from "../webpackCompiler";

const generateWebpackResultFilename = (workingFolder: string, taskDisplayName: string) => {
    const webpackResultFilenamePostfix = ".webpack.result.md";

    return path.join(workingFolder, `${filenamify(taskDisplayName).trim()}${webpackResultFilenamePostfix}`);
};

const createWebpackResultMarkdownFile = (
    workingFolder: string,
    taskDisplayName: string,
    result: IWebpackCompilationResult,
    webpackConfiguration: any): void => {

    console.log("webpack summary section markdown file creation is started");

    const fixedTaskDisplayName = taskDisplayName.replace(/\[/g, "(").replace(/\]/g, ")").trim();

    const webpackResultFilename = generateWebpackResultFilename(workingFolder, fixedTaskDisplayName);
    const resultFileContent = `<div class="copy-content-textarea"><pre style="font: inherit">${result.toString(webpackConfiguration)}</pre></div>`;

    tl.writeFile(webpackResultFilename, resultFileContent);

    console.log(`webpack sumamry section markdown file is created with the name '${webpackResultFilename}'`);
    console.log(`##vso[task.addattachment type=Distributedtask.Core.Summary;name=${fixedTaskDisplayName} result;]${webpackResultFilename}`);
};

export {
    createWebpackResultMarkdownFile
};
