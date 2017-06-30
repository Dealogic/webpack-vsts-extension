import { ITestRunConfiguration } from "./ITestRunConfiguration";
import createTaskMockRunner from "./taskMockRunnerFactory";
import registerTaskDisplayNameVariableMockExport from "./taskDisplayNameVariableMockExportRegister";
import registerMockWebpackModuleResolver from "./mockWebpackModuleResolverRegister";
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

    if (!testRunConfiguration.webpackModuleLocation) {
        testRunConfiguration.webpackModuleLocation = "webpack";
    }

    if (!testRunConfiguration.webpackConfigLocation) {
        testRunConfiguration.webpackConfigLocation = "./webpack.config";
    }

    if (!testRunConfiguration.treatErrorsAs) {
        testRunConfiguration.treatErrorsAs = "errors";
    }

    if (!testRunConfiguration.treatWarningsAs) {
        testRunConfiguration.treatWarningsAs = "warnings";
    }

    if (!testRunConfiguration.webpackConfig) {
        testRunConfiguration.webpackConfig = {};
    }

    const taskMockRunner = createTaskMockRunner();

    taskMockRunner.setInput("webpackModuleLocation", testRunConfiguration.webpackModuleLocation);
    taskMockRunner.setInput("webpackConfigLocation", testRunConfiguration.webpackConfigLocation);
    taskMockRunner.setInput("workingFolder", testRunConfiguration.workingFolder);
    taskMockRunner.setInput("treatErrorsAs", testRunConfiguration.treatErrorsAs);
    taskMockRunner.setInput("treatWarningsAs", testRunConfiguration.treatWarningsAs);

    registerTaskDisplayNameVariableMockExport(taskMockRunner, testRunConfiguration.taskDisplayName);

    if (testRunConfiguration.webpackCompilationResult) {
        registerMockWebpackModuleResolver(
            taskMockRunner,
            testRunConfiguration.webpackConfig,
            testRunConfiguration.webpackCompilationError,
            testRunConfiguration.webpackCompilationResult);
    }

    if (testRunConfiguration.mockWriteFile) {
        taskMockRunner.registerMockExport("writeFile", (resultFileName: string, content: string) => {
            fs.writeFileSync(resultFileName, content, { encoding: "utf8" });
        });
    }

    taskMockRunner.run();
};

export default runTestTask;
