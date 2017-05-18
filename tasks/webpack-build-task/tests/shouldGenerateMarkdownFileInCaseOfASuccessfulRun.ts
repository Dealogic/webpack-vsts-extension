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
        const expectedContent =
            `Hash: hash  \r\nVersion: 1.0.0  \r\nTime: 1ms  \r\n  \r\nAsset | Size | Chunks | | `
            + `Chunk Names\r\n---: | ---: | ---: | ---: | ---\r\nmain.js|100 bytes|1, 2|[emitted]|1, 2\r\n	+ 3 hidden modules  \r\n`;

        assert.equal(content, expectedContent, "summary section file should be generated");

        done();
};
