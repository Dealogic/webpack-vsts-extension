import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldReplaceBracketsToParenthesisInTaskName.js");
        const testRunner = new MockTestRunner(testPath);
        testRunner.run();

        assert.isTrue(testRunner.succeeded, "task should be succeeded");
        assert.isFalse(testRunner.failed, "task should be not failed");

        const resultFileIsAttached = testRunner.stdOutContained("##vso[task.addattachment type=Distributedtask.Core.Summary;name=webpack (something in brackets) result;]");
        assert.isTrue(resultFileIsAttached, "result file should be attached");

        const resultFilenameConverted = testRunner.stdOutContained("webpack (something in brackets).webpack.result.md");
        assert.isTrue(resultFilenameConverted, "attached filename should contain normal parenthesis");

        done();
};
