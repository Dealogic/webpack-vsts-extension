import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldFailIfThereAreErrorsAndWarningsWebpack2.js");
        let testRunner = new MockTestRunner(testPath);

        testRunner.run();

        const expectedMarkdownFilename = "webpack test.webpack.result.md";
        const expectedResultMessage = "webpack test failed";

        assert.isFalse(testRunner.succeeded, "task should not be succeeded");
        assert.isTrue(testRunner.failed, "task should be failed");
        assert.isTrue(testRunner.stdOutContained(expectedMarkdownFilename), `stdout should contain ${expectedMarkdownFilename}`);
        assert.isTrue(testRunner.stdOutContained(expectedResultMessage), `stdout should contain ${expectedResultMessage}`);
        assert.equal(testRunner.warningIssues.length, 1, "there should be one warning");
        assert.equal(testRunner.warningIssues[0], "webpack test: warning");
        assert.equal(testRunner.errorIssues.length, 2, "there should be 2 errors");
        assert.equal(testRunner.errorIssues[0], "webpack test failed");
        assert.equal(testRunner.errorIssues[1], "webpack test: error");

        done();
};
