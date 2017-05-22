import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldSucceedIfNoErrorsAndWarnings.js");
        let testRunner = new MockTestRunner(testPath);
        testRunner.run();

        const content = fs.readFileSync("tests/webpack test.webpack.result.md", "utf8");
        const expectedContent = "formatted output";

        assert.equal(content, expectedContent, "summary section file should be generated");

        done();
};
