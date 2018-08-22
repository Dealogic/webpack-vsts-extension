import { ITestRunConfiguration } from "./ITestRunConfiguration";
import createTaskMockRunner from "./taskMockRunnerFactory";
import registerTaskDisplayNameVariableMockExport from "./taskDisplayNameVariableMockExportRegister";
import registerMockWebpackCliExecutorCompiler from "./mockWebpackCliExecutorRegister";
import registerMockWebpackStatsResolver from "./mockWebpackStatsResolverRegister";
import * as fs from "fs";
import * as path from "path";

const runTestTask = (testRunConfiguration: ITestRunConfiguration) => {
    if (!testRunConfiguration.taskDisplayName && !testRunConfiguration.nullTaskDisplayName) {
        testRunConfiguration.taskDisplayName = "webpack test";
    }

    if (testRunConfiguration.nullTaskDisplayName) {
        testRunConfiguration.taskDisplayName = "";
    }

    if (!testRunConfiguration.workingFolder) {
        testRunConfiguration.workingFolder = path.resolve(__dirname, "..", "..");
    }

    if (!testRunConfiguration.webpackCliLocation) {
        testRunConfiguration.webpackCliLocation = "./node_modules/webpack/bin/webpack.js";
    }

    if (!testRunConfiguration.webpackCliArguments) {
        testRunConfiguration.webpackCliArguments = "";
    }

    if (!testRunConfiguration.statsjsLocation) {
        testRunConfiguration.statsjsLocation = "./node_modules/webpack/lib/Stats.js";
    }

    if (!testRunConfiguration.treatErrorsAs) {
        testRunConfiguration.treatErrorsAs = "errors";
    }

    if (!testRunConfiguration.treatWarningsAs) {
        testRunConfiguration.treatWarningsAs = "warnings";
    }

    const taskMockRunner = createTaskMockRunner();

    taskMockRunner.setInput("webpackCliLocation", testRunConfiguration.webpackCliLocation);
    taskMockRunner.setInput("webpackCliArguments", testRunConfiguration.webpackCliArguments);
    taskMockRunner.setInput("statsjsLocation", testRunConfiguration.statsjsLocation);
    taskMockRunner.setInput("workingFolder", testRunConfiguration.workingFolder);
    taskMockRunner.setInput("treatErrorsAs", testRunConfiguration.treatErrorsAs);
    taskMockRunner.setInput("treatWarningsAs", testRunConfiguration.treatWarningsAs);

    if (testRunConfiguration.webpackCompilationResult) {
        registerMockWebpackCliExecutorCompiler(taskMockRunner, testRunConfiguration.webpackCompilationResult, testRunConfiguration.webpackCompilationError);
        registerMockWebpackStatsResolver(taskMockRunner);
    }

    registerTaskDisplayNameVariableMockExport(taskMockRunner, testRunConfiguration.taskDisplayName);

    if (testRunConfiguration.mockWriteFile) {
        taskMockRunner.registerMockExport("writeFile", (resultFileName: string, content: string) => {
            fs.writeFileSync(resultFileName, content, { encoding: "utf8" });
        });
    }

    taskMockRunner.run();
};

export default runTestTask;
