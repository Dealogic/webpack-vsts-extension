import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldSucceedIfThereAreWarningsButTreatedAsInfo.js");
        let testRunner = new MockTestRunner(testPath);
        testRunner.run();

        assert.isTrue(testRunner.succeeded, "should be succeeded");
        assert.equal(testRunner.errorIssues.length, 0, "there should be no errors");
        assert.equal(testRunner.warningIssues.length, 0, "there should be no warnings");

        const content = fs.readFileSync("tests/webpack test.webpack.result.md", "utf8");
        const expectedContent =
            `Hash: hash  \r\nVersion: 1.0.0  \r\nTime: 1ms  \r\n  \r\nAsset | Size | Chunks | | `
            + `Chunk Names\r\n---: | ---: | ---: | ---: | ---\r\n	+ 1 hidden modules  \r\nWARNING IN warning  \r\n`;

        assert.equal(content, expectedContent, "summary section file should contain the errors and warnings");

        done();
};
