import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export function executeTest(done: MochaDone): void {
        // tslint:disable-next-line:no-invalid-this
        this.timeout(60000);

        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldCompileWebpack3Project.js");
        const testRunner = new MockTestRunner(testPath);

        testRunner.run();

        let content = fs.readFileSync("../../samples/webpack-3/webpack test.webpack.result.md", "utf8");
        content = content.replace("<div class=\"copy-content-textarea\"><pre style=\"font: inherit\">", "").replace("</pre></div>", "");

        assert.isTrue(testRunner.succeeded, "webpack task should be succeeded");

        assert.include(content, "Hash: def7d8b58dc13b96cf43", "Expected hash is not found in the markdown file.");
        assert.include(content, "Version: webpack 3.0.0", "Expected webpack version is not found in the markdown file.");
        assert.include(content, "bundle.js  19.6 kB       0  [emitted]  main", "Expected bundle.js row is not found in the markdown file.");

        assert.include(testRunner.stdout, content, "The markdown file output has to be included in the standard out.");

        done();
}
