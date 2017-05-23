import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldSucceedIfNoErrorsAndWarnings.js");
        let testRunner = new MockTestRunner(testPath);
        testRunner.run();

        const expectedWebpackCompilationStartedLog = "compilation of the webpack project is started";
        assert.isTrue(testRunner.stdOutContained(expectedWebpackCompilationStartedLog), `stdout should contain ${expectedWebpackCompilationStartedLog}`);

        const expectedWebpackCompilationDoneLog = "compilation of the webpack project is done";
        assert.isTrue(testRunner.stdOutContained(expectedWebpackCompilationDoneLog), `stdout should contain ${expectedWebpackCompilationDoneLog}`);

        const expectedSummarySectionLog = "webpack summary section markdown file creation is started";
        assert.isTrue(testRunner.stdOutContained(expectedSummarySectionLog), `stdout should contain ${expectedSummarySectionLog}`);

        const expectedSummarySectionFileCreatedLog = `webpack sumamry section markdown file is created with the name '${path.join(__dirname, "webpack test.webpack.result.md")}'`;
        assert.isTrue(testRunner.stdOutContained(expectedSummarySectionFileCreatedLog), `stdout should contain ${expectedSummarySectionFileCreatedLog}`);

        done();
};
