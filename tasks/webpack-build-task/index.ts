import tl = require("vsts-task-lib/task");
import { build } from "./WebpackBuild";
import { IWebpackBuildResult } from "./IWebpackBuildResult";
import os = require("os");
import prettyBytes = require("pretty-bytes");

const getSizeString = (size: number) => {
    const sizeAsString = prettyBytes(size);

    return sizeAsString.replace(" B", " bytes");
};

const createWebpackResultMarkdownFile = (workingFolder: string, result: IWebpackBuildResult): void => {
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

    tl.writeFile(`${workingFolder}webpack.result.md`, resultFileContent);

    console.log(`##vso[task.addattachment type=Distributedtask.Core.Summary;name=Webpack Build Result;]${workingFolder}webpack.result.md`);
};

async function run(): Promise<void> {
    try {
        const workingFolder = tl.getPathInput("workingFolder", false);
        const webpackJsLocation = tl.getInput("webpackJsLocation", true);
        const webpackArguments = tl.getInput("arguments", false);

        const result = build(workingFolder, webpackJsLocation, webpackArguments);

        let hasErrors = result && result.errors && result.errors.length > 0;
        let hasWarnings = result && result.warnings && result.warnings.length > 0;

        if (hasErrors) {
            tl.setResult(tl.TaskResult.Failed, "Webpack Build Failed");
        } else if (hasWarnings) {
            tl.warning("Webpack Build Partially Succeeded");
        } else {
            console.log("Webpack Build Succeeded");
        }

        if (hasErrors) {
            for (let error of result.errors) {
                error = error.replace("\n", " ");

                tl.error(error);
            }
        }

        if (hasWarnings) {
            for (let warning of result.warnings) {
                warning = warning.replace("\n", " ");

                tl.warning(warning);
            }
        }

        if (hasWarnings && !hasErrors) {
            console.log("##vso[task.complete result=SucceededWithIssues;]DONE");
        }

        createWebpackResultMarkdownFile(workingFolder, result);
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, "Webpack Build Failed");
        tl.error(err.message);
    }
}

run();
