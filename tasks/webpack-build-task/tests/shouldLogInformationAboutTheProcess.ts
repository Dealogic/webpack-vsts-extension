import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldSucceedIfNoErrorsAndWarnings.js");
        let testRunner = new MockTestRunner(testPath);
        testRunner.run();

        const expectedWebpackBuildLog = "building the webpack project";
        assert.isTrue(testRunner.stdOutContained(expectedWebpackBuildLog), `stdout should contain ${expectedWebpackBuildLog}`);

        const expectedSummarySectionLog = "creating the summary section";
        assert.isTrue(testRunner.stdOutContained(expectedSummarySectionLog), `stdout should contain ${expectedSummarySectionLog}`);

        const expectedSummarySectionFileCreatedLog = `Result file '${path.join(__dirname, "webpack test.webpack.result.md")}' is created.`;
        assert.isTrue(testRunner.stdOutContained(expectedSummarySectionFileCreatedLog), `stdout should contain ${expectedSummarySectionFileCreatedLog}`);

        done();
};
