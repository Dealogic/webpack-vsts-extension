import * as path from "path";
import { MockTestRunner } from "vsts-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";

const mockRunnerDefinitions = "mockRunnerDefinitions";

describe("webpack build task", () => {
    after((done: MochaDone) => {
        const filename = "tests/webpack test.webpack.result.md";

        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
        }

        done();
    });

    it("should fail if there are errors and warnings", (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldFailIfThereAreErrorsAndWarnings.js");
        let testRunner = new MockTestRunner(testPath);

        testRunner.run();

        const expectedMarkdownFilename = "webpack test.webpack.result.md";
        const expectedResultMessage = "webpack test failed";

        assert.isFalse(testRunner.succeeded, "should not be succeeded");
        assert.isTrue(testRunner.failed, "should be failed");
        assert.isTrue(testRunner.stdOutContained(expectedMarkdownFilename), `stdout should contain ${expectedMarkdownFilename}`);
        assert.isTrue(testRunner.stdOutContained(expectedResultMessage), `stdout should contain ${expectedResultMessage}`);
        assert.equal(testRunner.warningIssues.length, 1, "there should be one warning");
        assert.equal(testRunner.warningIssues[0], "webpack test: warning");
        assert.equal(testRunner.errorIssues.length, 2, "there should be 2 errors");
        assert.equal(testRunner.errorIssues[0], "webpack test failed");
        assert.equal(testRunner.errorIssues[1], "webpack test: error");

        done();
    });

    it("should partially succeed if no errors but at least one warning", (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldPartiallySucceedIfNoErrorsButAtLeastOneWarning.js");
        let testRunner = new MockTestRunner(testPath);

        testRunner.run();

        const expectedMarkdownFilename = "webpack test.webpack.result.md";
        const expectedResultMessage = "webpack test partially succeeded";

        assert.isTrue(testRunner.succeeded, "should be succeeded");
        assert.isFalse(testRunner.failed, "should not be failed");
        assert.isTrue(testRunner.stdOutContained(expectedMarkdownFilename), `stdout should contain ${expectedMarkdownFilename}`);
        assert.isTrue(testRunner.stdOutContained(expectedResultMessage), `stdout should contain ${expectedResultMessage}`);
        assert.equal(testRunner.warningIssues.length, 2, "there should be two warnings");
        assert.equal(testRunner.warningIssues[0], "webpack test partially succeeded");
        assert.equal(testRunner.warningIssues[1], "webpack test: warning");
        assert.equal(testRunner.errorIssues.length, 0, "there should be no errors");

        done();
    });

    it("should succeed if no display name defined", (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldSucceedIfNoDisplayNameDefined.js");
        let testRunner = new MockTestRunner(testPath);

        testRunner.run();

        const expectedMarkdownFilename = "webpack.webpack.result.md";
        const expectedResultMessage = "webpack succeeded";

        assert.isTrue(testRunner.succeeded, "should be succeeded");
        assert.isTrue(testRunner.stdOutContained(expectedMarkdownFilename), `stdout should contain ${expectedMarkdownFilename}`);
        assert.isTrue(testRunner.stdOutContained(expectedResultMessage), `stdout should contain ${expectedResultMessage}`);
        assert.equal(testRunner.warningIssues.length, 0, "there should be no warnings");
        assert.equal(testRunner.errorIssues.length, 0, "there should be no errors");

        done();
    });

    it("should succeed if no errors and warnings", (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldSucceedIfNoErrorsAndWarnings.js");
        let testRunner = new MockTestRunner(testPath);

        testRunner.run();

        const expectedMarkdownFilename = "webpack test.webpack.result.md";
        const expectedResultMessage = "webpack test succeeded";

        assert.isTrue(testRunner.succeeded, "should be succeeded");
        assert.isTrue(testRunner.stdOutContained(expectedMarkdownFilename), `stdout should contain ${expectedMarkdownFilename}`);
        assert.isTrue(testRunner.stdOutContained(expectedResultMessage), `stdout should contain ${expectedResultMessage}`);
        assert.equal(testRunner.warningIssues.length, 0, "there should be no warnings");
        assert.equal(testRunner.errorIssues.length, 0, "there should be no errors");

        done();
    });

    it("should log information about the process", (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldSucceedIfNoErrorsAndWarnings.js");
        let testRunner = new MockTestRunner(testPath);
        testRunner.run();

        const expectedWebpackBuildLog = "building the webpack project";
        assert.isTrue(testRunner.stdOutContained(expectedWebpackBuildLog), `stdout should contain ${expectedWebpackBuildLog}`);

        const expectedSummarySectionLog = "creating the summary section";
        assert.isTrue(testRunner.stdOutContained(expectedSummarySectionLog), `stdout should contain ${expectedSummarySectionLog}`);

        done();
    });

    it("should generate markdown file in case of a successful run", (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldSucceedIfNoErrorsAndWarnings.js");
        let testRunner = new MockTestRunner(testPath);
        testRunner.run();

        const content = fs.readFileSync("tests/webpack test.webpack.result.md", "utf8");
        const expectedContent = fs.readFileSync("tests/expectedMarkdownFileInCaseOfSuccessfulRun.md", "utf8");

        assert.equal(content, expectedContent, "generated markdown file is not correct");

        done();
    })
});
