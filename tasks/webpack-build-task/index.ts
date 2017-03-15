import tl = require("vsts-task-lib/task");
import { build } from "./webpackBuild";
import { createWebpackResultMarkdownFile } from "./summarySectionBuilder";

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
        tl.error(err);
    }
}

run();
