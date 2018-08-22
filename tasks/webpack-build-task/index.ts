import tl = require("vsts-task-lib/task");
import { compile, IWebpackCompilationResult } from "./webpackCompiler";
import publishTaskResult from "./taskResultPublisher";

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
        const enablePullRequestComments = tl.getBoolInput("enablePullRequestComments", false);

        if (!workingFolder) {
            workingFolder = __dirname;
        }

        console.log(`workingFolder: ${workingFolder}`);
        console.log(`webpackCliLocation: ${webpackCliLocation}`);
        console.log(`webpackCliArguments: ${webpackCliArguments}`);
        console.log(`statsjsLocation: ${webpackStatsJsLocation}`);

        console.log(`treatErrorsAs: ${treatErrorsAs}`);
        console.log(`treatWarningsAs: ${treatWarningsAs}`);

        tl.cd(workingFolder);
        process.chdir(workingFolder);

        const result = compile(workingFolder, webpackCliLocation, webpackCliArguments, webpackStatsJsLocation);
        await publishTaskResult(taskDisplayName, result, treatErrorsAs, treatWarningsAs, workingFolder, webpackStatsJsLocation, enablePullRequestComments);

    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, `${taskDisplayName} failed`);
        tl.error(err);

        console.log(err);
    }
}

run();
