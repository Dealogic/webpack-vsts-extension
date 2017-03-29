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

        assert.isFalse(testRunner.succeeded, "task should not be succeeded");
        assert.isTrue(testRunner.failed, "task should be failed");
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

        assert.isTrue(testRunner.succeeded, "task should be succeeded");
        assert.isFalse(testRunner.failed, "task should not be failed");
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

        assert.isTrue(testRunner.succeeded, "task should be succeeded");
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

        assert.isTrue(testRunner.succeeded, "task should be succeeded");
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
        const expectedContent =
            `Hash: hash  \r\nVersion: 1.0.0  \r\nTime: 1ms  \r\n  \r\nAsset | Size | Chunks | | `
            + `Chunk Names\r\n---: | ---: | ---: | ---: | ---\r\nmain.js|100 bytes|1, 2|[emitted]|1, 2\r\n	+ 3 hidden modules  \r\n`;

        assert.equal(content, expectedContent, "summary section file should be generated");

        done();
    });

    it("should succeed if there are errors, but those are treated as info", (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldSucceedIfThereAreErrosButTreatedAsInfo.js");
        let testRunner = new MockTestRunner(testPath);
        testRunner.run();

        assert.isTrue(testRunner.succeeded, "should be succeeded");
        assert.equal(testRunner.errorIssues.length, 0, "there should be no errors");
        assert.equal(testRunner.warningIssues.length, 0, "there should be no warnings");

        const content = fs.readFileSync("tests/webpack test.webpack.result.md", "utf8");
        const expectedContent =
        `Hash: hash  \r\nVersion: 1.0.0  \r\nTime: 1ms  \r\n  \r\nAsset | Size | Chunks | | `
            + `Chunk Names\r\n---: | ---: | ---: | ---: | ---\r\n	+ 1 hidden modules  \r\nERROR IN error  \r\n`;

        assert.equal(content, expectedContent, "summary section file should contain the errors and warnings");

        done();
    });

    it("should partially succeed if there are errors, but those are treated as warnings", (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarning.js");
        let testRunner = new MockTestRunner(testPath);
        testRunner.run();

        assert.isTrue(testRunner.succeeded, "task should be succeeded");
        assert.isFalse(testRunner.failed, "task should be not failed");

        const expectedResultMessage = "webpack test partially succeeded";
        assert.isTrue(testRunner.stdOutContained(expectedResultMessage), `stdout should contain ${expectedResultMessage}`);

        assert.equal(testRunner.errorIssues.length, 0, "there should be no errors");

        assert.equal(testRunner.warningIssues.length, 2, "there should be two warnings");
        assert.equal(testRunner.warningIssues[0], "webpack test partially succeeded");
        assert.equal(testRunner.warningIssues[1], "webpack test: error");

        const content = fs.readFileSync("tests/webpack test.webpack.result.md", "utf8");
        const expectedContent =
        `Hash: hash  \r\nVersion: 1.0.0  \r\nTime: 1ms  \r\n  \r\nAsset | Size | Chunks | | `
            + `Chunk Names\r\n---: | ---: | ---: | ---: | ---\r\n	+ 1 hidden modules  \r\nERROR IN error  \r\n`;

        assert.equal(content, expectedContent, "summary section file should contain the errors and warnings");

        done();
    });

    it("should succeed if there are warnings, but those are treated as info", (done: MochaDone) => {
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
    });

    it("should fail if there are warnings, but those are treated as errors", (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldFailIfThereAreWarningsButTreatedAsErrors.js");
        let testRunner = new MockTestRunner(testPath);
        testRunner.run();

        assert.isFalse(testRunner.succeeded, "task should be not succeeded");
        assert.isTrue(testRunner.failed, "task should be failed");

        assert.equal(testRunner.errorIssues.length, 2, "there should be two errors");
        assert.equal(testRunner.errorIssues[0], "webpack test failed");
        assert.equal(testRunner.errorIssues[1], "webpack test: warning");

        assert.equal(testRunner.warningIssues.length, 0, "there should be no warnings");


        const content = fs.readFileSync("tests/webpack test.webpack.result.md", "utf8");
        const expectedContent =
        `Hash: hash  \r\nVersion: 1.0.0  \r\nTime: 1ms  \r\n  \r\nAsset | Size | Chunks | | `
            + `Chunk Names\r\n---: | ---: | ---: | ---: | ---\r\n	+ 1 hidden modules  \r\nWARNING IN warning  \r\n`;

        assert.equal(content, expectedContent, "summary section file should contain the errors and warnings");

        done();
    });

    it("should report error detail in case of webpack build failure", (done: MochaDone) => {
        let testPath = path.join(__dirname, mockRunnerDefinitions, "shouldReportErrorDetailInCaseOfWebpackBuildFailure.js");
        let testRunner = new MockTestRunner(testPath);
        testRunner.run();

        assert.isFalse(testRunner.succeeded, "task should be not succeeded");
        assert.isTrue(testRunner.failed, "task should be failed");
        assert.equal(testRunner.errorIssues.length, 2);
        assert.equal(testRunner.errorIssues[0], "webpack test failed");
        assert.equal(testRunner.errorIssues[1], "Error: error happened during execution of webpack command");
        assert.isTrue(testRunner.stdOutContained("at executeWebpackCommand"), "task should report the error detail on the console");

        done();
    });
});
