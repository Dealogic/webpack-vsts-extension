import tl = require("vsts-task-lib/task");
import { IWebpackCompilationResult } from "../webpackCompiler";
import { createWebpackResultMarkdownFile } from "../summarySectionBuilder";
import publishResultAsPullRequestComments from "./publishResultAsPullRequestComments";

const errors = "errors";
const warnings = "warnings";
const info = "info";

const convertMessageToSingleLine = (message: string): string => {
    const messageParts = message.split("\n");

    for (let index = 0; index < messageParts.length; index++) {
        messageParts[index] = messageParts[index].trim();
    }

    return messageParts.join("; ");
};

const publishTaskResult = async (
    taskDisplayName: string,
    result: IWebpackCompilationResult,
    treatErrorsAs: string,
    treatWarningsAs: string,
    workingFolder: string,
    webpackStatsJsLocation: string,
    enablePullRequestComments: boolean) => {

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

        try {
            await publishResultAsPullRequestComments(enablePullRequestComments, taskDisplayName, errorsArray, warningsArray);
        } catch (error) {
            console.log("Couldn't publish result as pull request comments. The reason is:");
            console.log(error);
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
};

export default publishTaskResult;
