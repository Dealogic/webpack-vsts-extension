import tl = require("vsts-task-lib/task");
import { compile, IWebpackCompilationResult } from "./webpackCompiler";
import { createWebpackResultMarkdownFile } from "./summarySectionBuilder";
import { collectErrors, collectWarnings } from "./errorsAndWarningsCollector";
import { resolveWebpackModule, resolveWebpackConfig } from "./webpackModuleResolver";

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
        const webpackModuleLocation = tl.getInput("webpackModuleLocation", false);
        const webpackConfigLocation = tl.getInput("webpackConfigLocation", true);
        const treatErrorsAs = tl.getInput("treatErrorsAs", true);
        const treatWarningsAs = tl.getInput("treatWarningsAs", true);

        const errors = "errors";
        const warnings = "warnings";
        const info = "info";

        tl.cd(workingFolder);
        process.chdir(workingFolder);

        const webpackModule = resolveWebpackModule(workingFolder, webpackModuleLocation);
        const webpackConfig = resolveWebpackConfig(workingFolder, webpackConfigLocation);

        compile(webpackModule, webpackConfig, (error: any, result: IWebpackCompilationResult) => {
            const errorsArray: string[] = collectErrors(result);
            const warningsArray: string[] = collectWarnings(result);

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
