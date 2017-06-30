import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export function executeTest(done: MochaDone): void {
        // tslint:disable-next-line:no-invalid-this
        this.timeout(3000);

        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldCompileWebpack2Project.js");
        let testRunner = new MockTestRunner(testPath);

        testRunner.run();

        assert.include(testRunner.stdout, "Hash: 2ffab36eb69fd0498db5", "Expected webpack hash is not found.");

        done();
};
