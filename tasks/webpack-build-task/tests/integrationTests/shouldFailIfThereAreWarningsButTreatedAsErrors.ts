import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldFailIfThereAreWarningsButTreatedAsErrors.js");
        const testRunner = new MockTestRunner(testPath);
        testRunner.run();

        assert.isFalse(testRunner.succeeded, "task should be not succeeded");
        assert.isTrue(testRunner.failed, "task should be failed");

        assert.equal(testRunner.errorIssues.length, 2, "there should be two errors");
        assert.equal(testRunner.errorIssues[0], "webpack test failed");
        assert.equal(testRunner.errorIssues[1], "webpack test: warning");

        assert.equal(testRunner.warningIssues.length, 0, "there should be no warnings");

        done();
};
