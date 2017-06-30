import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldCollectErrorsAndWarningsFromChildren.js");
        const testRunner = new MockTestRunner(testPath);

        testRunner.run();

        const expectedMarkdownFilename = "webpack test.webpack.result.md";
        const expectedResultMessage = "webpack test failed";

        assert.isFalse(testRunner.succeeded, "task should not be succeeded");
        assert.isTrue(testRunner.failed, "task should be failed");
        assert.isTrue(testRunner.stdOutContained(expectedMarkdownFilename), `stdout should contain ${expectedMarkdownFilename}`);
        assert.isTrue(testRunner.stdOutContained(expectedResultMessage), `stdout should contain ${expectedResultMessage}`);

        assert.equal(testRunner.warningIssues.length, 4, "there should be 4 warnings");
        assert.equal(testRunner.warningIssues[0], "webpack test: root-warning");
        assert.equal(testRunner.warningIssues[1], "webpack test: first-child-warning");
        assert.equal(testRunner.warningIssues[2], "webpack test: child-for-first-child-warning");
        assert.equal(testRunner.warningIssues[3], "webpack test: second-child-warning");

        assert.equal(testRunner.errorIssues.length, 5, "there should be 5 errors");
        assert.equal(testRunner.errorIssues[0], "webpack test failed");
        assert.equal(testRunner.errorIssues[1], "webpack test: root-error");
        assert.equal(testRunner.errorIssues[2], "webpack test: first-child-error");
        assert.equal(testRunner.errorIssues[3], "webpack test: child-for-first-child-error");
        assert.equal(testRunner.errorIssues[4], "webpack test: second-child-error");

        assert.equal(0, 1);

        done();
};
