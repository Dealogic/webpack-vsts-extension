import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export function executeTest(done: MochaDone): void {
        // tslint:disable-next-line:no-invalid-this
        this.timeout(60000);

        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldBeAbleToUseNodeArgs.js");
        const testRunner = new MockTestRunner(testPath);

        testRunner.run();
        console.log(testRunner.stdout);

        assert.isTrue(testRunner.succeeded, "webpack task should be succeeded");

        assert.include(testRunner.stdout, "executing the command: node --max_old_space_size=4096", "node args is not included");

        done();
}
