import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export function executeTest(done: MochaDone): void {
        // tslint:disable-next-line:no-invalid-this
        this.timeout(8000);

        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldCompileWebpack3ProjectWithIssues.js");
        const testRunner = new MockTestRunner(testPath);

        testRunner.run();

        const content = fs.readFileSync("../../samples/webpack-3-with-issues/webpack test.webpack.result.md", "utf8");

        assert.isFalse(testRunner.succeeded, "webpack task should not be succeeded");
        assert.isTrue(testRunner.failed, "webpack task should be failed");

        assert.equal(2, testRunner.errorIssues.length, "webpack task should report 2 errors");
        assert.equal(1, testRunner.warningIssues.length, "webpack task should report 1 warning");

        assert.include(content, "Hash: ab8505e5962e1f3e1446", "Expected hash is not found in the markdown file.");
        assert.include(content, "Version: webpack 3.0.0", "Expected webpack version is not found in the markdown file.");
        assert.include(content, "bundle.js  2.53 kB       0  [emitted]  main", "Expected bundle.js row is not found in the markdown file.");

        assert.include(testRunner.stdout, content.replace("<pre>", "").replace("</pre>", ""), "The markdown file output has to be included in the standard out.");

        done();
}
