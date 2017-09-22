import tl = require("vsts-task-lib/task");
import path = require("path");
import filenamify = require("filenamify");
import { IWebpackCompilationResult } from "../webpackCompiler";

const generateWebpackResultFilename = (workingFolder: string, taskDisplayName: string) => {
    const webpackResultFilenamePostfix = ".webpack.result.md";

    const filename = filenamify(taskDisplayName).replace(/\[/g, "(").replace(/\]/g, ")").trim();
    return path.join(workingFolder, `${filename}${webpackResultFilenamePostfix}`);
};

const createWebpackResultMarkdownFile = (
    workingFolder: string,
    taskDisplayName: string,
    result: IWebpackCompilationResult,
    webpackConfiguration: any): void => {

    console.log("webpack summary section markdown file creation is started");

    const webpackResultFilename = generateWebpackResultFilename(workingFolder, taskDisplayName);
    const resultFileContent = `<pre>${result.toString(webpackConfiguration)}</pre>`;

    tl.writeFile(webpackResultFilename, resultFileContent);

    console.log(`webpack sumamry section markdown file is created with the name '${webpackResultFilename}'`);
    console.log(`##vso[task.addattachment type=Distributedtask.Core.Summary;name=${taskDisplayName} result;]${webpackResultFilename}`);
};

export {
    createWebpackResultMarkdownFile
};
