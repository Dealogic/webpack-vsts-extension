import tl = require("vsts-task-lib/task");
import { compile, IWebpackCompilationResult } from "./webpackCompiler";
import { createWebpackResultMarkdownFile } from "./summarySectionBuilder";
import { resolveWebpackModule, resolveWebpackConfig } from "./webpackModuleResolver";
import { resolveTsNodeModule, resolveTsNodeOptions } from "./tsNodeResolver";

const convertMessageToSingleLine = (message: string): string => {
    const messageParts = message.split("\n");

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
        let workingFolder = tl.getPathInput("workingFolder", false);
        const webpackModuleLocation = tl.getInput("webpackModuleLocation", false);
        const webpackConfigLocation = tl.getInput("webpackConfigLocation", true);
        const treatErrorsAs = tl.getInput("treatErrorsAs", true);
        const treatWarningsAs = tl.getInput("treatWarningsAs", true);
        const tsNodeModuleLocation = tl.getInput("tsNodeModuleLocation", false);
        const tsNodeOptionsLocation = tl.getInput("tsNodeOptionsLocation", false);

        const errors = "errors";
        const warnings = "warnings";
        const info = "info";

        if (!workingFolder) {
            workingFolder = __dirname;
        }

        console.log(`webpackConfigLocation: ${webpackConfigLocation}`);
        console.log(`treatErrorsAs: ${treatErrorsAs}`);
        console.log(`treatWarningsAs: ${treatWarningsAs}`);

        console.log(`workingFolder: ${workingFolder}`);
        console.log(`webpackModuleLocation: ${webpackModuleLocation}`);

        tl.cd(workingFolder);
        process.chdir(workingFolder);

        console.log("trying to resolve ts-node module");
        const tsNodeModule = resolveTsNodeModule(workingFolder, tsNodeModuleLocation);
        console.log("ts-node module resolution finsihed");

        if (tsNodeModule) {
            console.log("trying to resolve ts-node options");
            const tsNodeOptions = resolveTsNodeOptions(workingFolder, tsNodeOptionsLocation);
            console.log("ts-node options resolution finished");

            if (tsNodeOptions) {
                tsNodeModule.register(tsNodeOptions);
            } else {
                tsNodeModule.register();
            }
        }

        console.log("webpack module resolution started");
        const webpackModule = resolveWebpackModule(workingFolder, webpackModuleLocation);
        console.log("webpack module resolution finished");

        console.log("webpack config resolution started");
        const webpackConfig = resolveWebpackConfig(workingFolder, webpackConfigLocation);
        console.log("webpack config resolution finished");

        compile(webpackModule, webpackConfig, (error: any, result: IWebpackCompilationResult) => {
            const resultJson = result.toJson(webpackConfig, true);

            const errorsArray: string[] = resultJson.errors;
            const warningsArray: string[] = resultJson.warnings;

            const hasErrors = errorsArray.length > 0;
            const hasWarnings = warningsArray.length > 0;

            if ((hasErrors && treatErrorsAs === errors) || (hasWarnings && treatWarningsAs === errors)) {
                tl.setResult(tl.TaskResult.Failed, `${taskDisplayName} failed`);
            } else if ((hasErrors && treatErrorsAs === warnings) || (hasWarnings && treatWarningsAs === warnings)) {
                tl.warning(`${taskDisplayName} partially succeeded`);
            } else {
                console.log(`${taskDisplayName} succeeded`);
            }

            if (hasErrors && treatErrorsAs !== info) {
                for (let errorItem of errorsArray) {
                    errorItem = `${taskDisplayName}: ${convertMessageToSingleLine(errorItem)}`;

                    if (treatErrorsAs === errors) {
                        tl.error(errorItem);
                    } else if (treatErrorsAs === warnings) {
                        tl.warning(errorItem);
                    }
                }
            }

            if (hasWarnings && treatWarningsAs !== info) {
                for (let warningItem of warningsArray) {
                    warningItem = `${taskDisplayName}: ${convertMessageToSingleLine(warningItem)}`;

                    if (treatWarningsAs === errors) {
                        tl.error(warningItem);
                    } else if (treatWarningsAs === warnings) {
                        tl.warning(warningItem);
                    }
                }
            }

            const taskFailed = (hasErrors && treatErrorsAs === errors) || (hasWarnings && treatWarningsAs === errors);
            const taskPartiallySucceeded = !taskFailed && ((hasErrors && treatErrorsAs === warnings) || (hasWarnings && treatWarningsAs === warnings));

            if (taskPartiallySucceeded) {
                console.log("##vso[task.complete result=SucceededWithIssues;]DONE");
            }

            try {
                createWebpackResultMarkdownFile(workingFolder, taskDisplayName, result, webpackConfig);
            } catch (error) {
                console.log("Couldn't create webpack result markdown file");
                console.log(error);
            }
        });
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, `${taskDisplayName} failed`);
        tl.error(err);

        console.log(err);
    }
}

run();
