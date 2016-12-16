import tl = require("vsts-task-lib/task");
import { build } from "./lib/webpack";

async function run() {
    try {
        const currentWorkingDirectory = tl.getPathInput("currentWorkingDirectory", true);
        const webpackArguments = tl.getInput("webpackArguments", true);

        build(currentWorkingDirectory, webpackArguments, (result: any, error: Error) => {
            if (error) {
                throw error;
            } else {
                tl.setResult(tl.TaskResult.Succeeded, "Webpack build is finished.");
            }
        });
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
