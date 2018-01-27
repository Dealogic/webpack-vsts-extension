import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export function executeTest(done: MochaDone): void {
        // tslint:disable-next-line:no-invalid-this
        this.timeout(60000);

        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldCompileWebpackTypeScriptConfigProject.js");
        const testRunner = new MockTestRunner(testPath);

        testRunner.run();

        let content = fs.readFileSync("../../samples/webpack-ts-config/webpack test.webpack.result.md", "utf8");
        content = content.replace("<div class=\"copy-content-textarea\"><pre style=\"font: inherit\">", "").replace("</pre></div>", "");

        assert.isTrue(testRunner.succeeded, "webpack task should be succeeded");
        assert.isFalse(testRunner.failed, "webpack task should not be failed");

        assert.include(content, "Hash: a5ffd6ca9cbba72e1044", "Expected hash is not found in the markdown file.");
        assert.include(content, "Version: webpack 3.5.5", "Expected webpack version is not found in the markdown file.");
        assert.include(content, "bundle.js  2.5 kB       0  [emitted]  main", "Expected bundle.js row is not found in the markdown file.");

        assert.include(testRunner.stdout, content, "The markdown file output has to be included in the standard out.");

        done();
}
