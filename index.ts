import tl = require("vsts-task-lib/task");
import { build } from "./lib/webpack";

async function run(): Promise<void> {
    try {
        const currentWorkingDirectory = tl.getPathInput("currentWorkingDirectory", false);
        const webpackArguments = tl.getInput("webpackArguments", false);

        const result = build(currentWorkingDirectory, webpackArguments);

        let hasErrors = false;
        let hasWarnings = false;

        if (result && result.errors && result.errors.length > 0) {
            tl.setResult(tl.TaskResult.Failed, "Webpack Build Failed");
            hasErrors = true;

            for (let error of result.errors) {
                error = error.replace("\n", " ");

                tl.error(error);
            }
        }

        if (result && result.warnings && result.warnings.length > 0) {
            tl.warning("Webpack Build Partially Succeeded");
            hasWarnings = true;

            for (let warning of result.warnings) {
                warning = warning.replace("\n", " ");

                tl.warning(warning);
            }
        }

        if (!hasErrors && !hasWarnings) {
            console.log("Webpack Build Succeeded");
        }

        if (hasWarnings) {
            console.log("##vso[task.complete result=SucceededWithIssues;]DONE");
        }
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, "Webpack Build Failed");
        tl.error(err.message);
    }
}

run();
