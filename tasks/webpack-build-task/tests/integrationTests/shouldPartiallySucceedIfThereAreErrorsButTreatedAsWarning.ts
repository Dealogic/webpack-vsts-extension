import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarning.js");
        const testRunner = new MockTestRunner(testPath);
        testRunner.run();

        assert.isTrue(testRunner.succeeded, "task should be succeeded");
        assert.isFalse(testRunner.failed, "task should be not failed");

        const expectedResultMessage = "webpack test partially succeeded";
        assert.isTrue(testRunner.stdOutContained(expectedResultMessage), `stdout should contain ${expectedResultMessage}`);

        assert.equal(testRunner.errorIssues.length, 0, "there should be no errors");

        assert.equal(testRunner.warningIssues.length, 2, "there should be two warnings");
        assert.equal(testRunner.warningIssues[0], "webpack test partially succeeded");
        assert.equal(testRunner.warningIssues[1], "webpack test: error");

        done();
};
