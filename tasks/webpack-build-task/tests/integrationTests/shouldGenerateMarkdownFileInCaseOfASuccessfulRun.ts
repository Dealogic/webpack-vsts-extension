import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export const executeTest = (done: MochaDone) => {
        const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldSucceedIfNoErrorsAndWarnings.js");
        const testRunner = new MockTestRunner(testPath);
        testRunner.run();

        let content = fs.readFileSync("tests/integrationTests/webpack test.webpack.result.md", "utf8");
        content = content.replace("<div class=\"copy-content-textarea\"><pre style=\"font: inherit\">", "").replace("</pre></div>", "");

        const expectedContent = `{"hash":"","time":1,"version":"","assets":[],"children":[],"chunks":[],"errors":[],"warnings":[],"_showErrors":true,"_showWarnings":true}`;

        assert.equal(content, expectedContent, "summary section file should be generated");

        done();
};
