import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export function executeTest(done: MochaDone): void {
        // tslint:disable-next-line:no-invalid-this
        this.timeout(8000);

        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldCompileWebpack3Project.js");
        const testRunner = new MockTestRunner(testPath);

        testRunner.run();

        const content = fs.readFileSync("../../samples/webpack-3/webpack test.webpack.result.md", "utf8");

        assert.isTrue(testRunner.succeeded, "webpack task should be succeeded");

        assert.include(content, "Hash: a5ffd6ca9cbba72e1044", "Expected hash is not found in the markdown file.");
        assert.include(content, "Version: webpack 3.0.0", "Expected webpack version is not found in the markdown file.");
        assert.include(content, "bundle.js  2.5 kB       0  [emitted]  main", "Expected bundle.js row is not found in the markdown file.");

        assert.include(testRunner.stdout, content.replace("<pre>", "").replace("</pre>", ""), "The markdown file output has to be included in the standard out.");

        done();
}
