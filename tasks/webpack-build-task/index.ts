import tl = require("vsts-task-lib/task");
import { compile, IWebpackCompilationResult } from "./webpackCompiler";
import { createWebpackResultMarkdownFile } from "./summarySectionBuilder";
import resolveWebpackStats from "./webpackStatsResolver";

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
        const webpackCliLocation = tl.getInput("webpackCliLocation", true);
        const webpackCliArguments = tl.getInput("webpackCliArguments", false);
        const webpackStatsJsLocation = tl.getInput("statsjsLocation", true);
        const treatErrorsAs = tl.getInput("treatErrorsAs", true);
        const treatWarningsAs = tl.getInput("treatWarningsAs", true);
        const displaySummaryResult = tl.getInput("displaySummaryResults", false);

        const errors = "errors";
        const warnings = "warnings";
        const info = "info";

        if (!workingFolder) {
            workingFolder = __dirname;
        }

        console.log(`workingFolder: ${workingFolder}`);
        console.log(`webpackCliLocation: ${webpackCliLocation}`);
        console.log(`webpackCliArguments: ${webpackCliArguments}`);
        console.log(`statsjsLocation: ${webpackStatsJsLocation}`);
        console.log(`displaySummaryResult: ${displaySummaryResult}`);

        console.log(`treatErrorsAs: ${treatErrorsAs}`);
        console.log(`treatWarningsAs: ${treatWarningsAs}`);

        tl.cd(workingFolder);
        process.chdir(workingFolder);

        const result = compile(workingFolder, webpackCliLocation, webpackCliArguments);

        if (displaySummaryResult) {
            const stats = resolveWebpackStats(workingFolder, webpackStatsJsLocation);
            console.log(stats.jsonToString(result));
        }

        const errorsArray: string[] = result.errors;
        const warningsArray: string[] = result.warnings;

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
            createWebpackResultMarkdownFile(workingFolder, taskDisplayName, result, webpackStatsJsLocation);
        } catch (error) {
            console.log("Couldn't create webpack result markdown file");
            console.log(error);
        }
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, `${taskDisplayName} failed`);
        tl.error(err);

        console.log(err);
    }
}

run();
