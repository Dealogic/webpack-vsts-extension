import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldReportErrorDetailInCaseOfWebpackBuildFailure.js");
        const testRunner = new MockTestRunner(testPath);
        testRunner.run();

        assert.isFalse(testRunner.succeeded, "task should be not succeeded");
        assert.isTrue(testRunner.failed, "task should be failed");
        assert.equal(testRunner.errorIssues.length, 2);
        assert.equal(testRunner.errorIssues[0], "webpack test failed");
        assert.equal(testRunner.errorIssues[1], "Error: error happened during compilation of the webpack project");

        done();
};
