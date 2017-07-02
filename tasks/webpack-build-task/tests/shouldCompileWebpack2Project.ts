import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export function executeTest(done: MochaDone): void {
        // tslint:disable-next-line:no-invalid-this
        this.timeout(5000);

        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldCompileWebpack2Project.js");
        const testRunner = new MockTestRunner(testPath);

        testRunner.run();

        const content = fs.readFileSync("../../samples/webpack-2/webpack test.webpack.result.md", "utf8");

        assert.include(content, "Hash: 2ffab36eb69fd0498db5", "Expected hash is not found in the markdown file.");
        assert.include(content, "Version: webpack 2.2.0", "Expected webpack version is not found in the markdown file.");
        assert.include(content, "bundle.js  544 kB       0  [emitted]  [big]  main", "Expected bundle.js row is not found in the markdown file.");

        assert.include(testRunner.stdout, content.replace("<pre>", "").replace("</pre>", ""), "The markdown file output has to be included in the standard out.");

        done();
}
