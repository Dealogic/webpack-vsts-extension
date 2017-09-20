import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export function executeTest(done: MochaDone): void {
        // tslint:disable-next-line:no-invalid-this
        this.timeout(10000);

        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldCompileSimpleWebpackProject.js");
        const testRunner = new MockTestRunner(testPath);

        testRunner.run();

        const content = fs.readFileSync("../../samples/multiple-webpack-build-steps/webpack-project-one/webpack test.webpack.result.md", "utf8");

        assert.isTrue(testRunner.succeeded, "webpack task should be succeeded");

        assert.include(content, "Hash: 49f2492b5de21b031033", "Expected hash is not found in the markdown file.");
        assert.include(content, "Version: webpack 1.14.0", "Expected webpack version is not found in the markdown file.");
        assert.include(content, "main.bundle.js  1.44 kB       0  [emitted]  main", "Expected bundle.js row is not found in the markdown file.");

        assert.include(testRunner.stdout, content.replace("<pre>", "").replace("</pre>", ""), "The markdown file output has to be included in the standard out.");

        done();
}
