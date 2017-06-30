import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldCompileSimpleWebpackProject.js");
        let testRunner = new MockTestRunner(testPath);

        testRunner.run();

        assert.include(testRunner.stdout, "Hash: 49f2492b5de21b031033", "Expected webpack hash is not found.");

        done();
};
