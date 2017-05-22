import * as fs from "fs";
import * as shouldCollectErrorsAndWarningsFromChildren from "./shouldCollectErrorsAndWarningsFromChildren";
import * as shouldFailIfThereAreErrorsAndWarnings from "./shouldFailIfThereAreErrorsAndWarnings";
import * as shouldFailIfThereAreErrorsAndWarningsWebpack2 from "./shouldFailIfThereAreErrorsAndWarningsWebpack2";
import * as shouldFailIfThereAreWarningsButTreatedAsErrors from "./shouldFailIfThereAreWarningsButTreatedAsErrors";
import * as shouldPartiallySucceedIfNoErrorsButAtLeastOneWarning from "./shouldPartiallySucceedIfNoErrorsButAtLeastOneWarning";
import * as shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarning from "./shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarning";
import * as shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarningWebpack2 from "./shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarningWebpack2";
import * as shouldReportErrorDetailInCaseOfWebpackBuildFailure from "./shouldReportErrorDetailInCaseOfWebpackBuildFailure";
import * as shouldSucceedIfNoDisplayNameDefined from "./shouldSucceedIfNoDisplayNameDefined";
import * as shouldSucceedIfNoErrorsAndWarnings from "./shouldSucceedIfNoErrorsAndWarnings";
import * as shouldSucceedIfThereAreErrorsButTreatedAsInfo from "./shouldSucceedIfThereAreErrorsButTreatedAsInfo";
import * as shouldSucceedIfThereAreErrorsButTreatedAsInfoWebpack2 from "./shouldSucceedIfThereAreErrorsButTreatedAsInfoWebpack2";
import * as shouldSucceedIfThereAreWarningsButTreatedAsInfo from "./shouldSucceedIfThereAreWarningsButTreatedAsInfo";
import * as shouldLogInformationAboutTheProcess from "./shouldLogInformationAboutTheProcess";
import * as shouldGenerateMarkdownFileInCaseOfASuccessfulRun from "./shouldGenerateMarkdownFileInCaseOfASuccessfulRun";

describe("webpack build task", () => {
    after((done: MochaDone) => {
        const filename = "tests/webpack test.webpack.result.md";

        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
        }

        done();
    });

    it(
        "should collect errors and warnings from children",
        shouldCollectErrorsAndWarningsFromChildren.executeTest
    );

    it(
        "should fail if there are errors and warnings",
        shouldFailIfThereAreErrorsAndWarnings.executeTest);

    it(
        "should fail if there are errors and warnings in case of webpack 2",
        shouldFailIfThereAreErrorsAndWarningsWebpack2.executeTest);

    it(
        "should fail if there are warnings, but those are treated as errors",
        shouldFailIfThereAreWarningsButTreatedAsErrors.executeTest);

    it(
        "should generate markdown file in case of a successful run",
        shouldGenerateMarkdownFileInCaseOfASuccessfulRun.executeTest);

    it(
        "should log information about the process",
        shouldLogInformationAboutTheProcess.executeTest);

    it(
        "should partially succeed if no errors but at least one warning",
        shouldPartiallySucceedIfNoErrorsButAtLeastOneWarning.executeTest);

    it(
        "should partially succeed if there are errors, but those are treated as warnings",
        shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarning.executeTest);

    it(
        "should partially succeed if there are errors, but those are treated as warnings in case of webpack 2",
        shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarningWebpack2.executeTest);

    it(
        "should report error detail in case of webpack build failure",
        shouldReportErrorDetailInCaseOfWebpackBuildFailure.executeTest);

    it(
        "should succeed if no display name defined",
        shouldSucceedIfNoDisplayNameDefined.executeTest);

    it(
        "should succeed if no errors and warnings",
        shouldSucceedIfNoErrorsAndWarnings.executeTest);

    it(
        "should succeed if there are errors, but those are treated as info",
        shouldSucceedIfThereAreErrorsButTreatedAsInfo.executeTest);

    it(
        "should succeed if there are errors, but those are treated as info in case of webpack 2",
        shouldSucceedIfThereAreErrorsButTreatedAsInfoWebpack2.executeTest);

    it(
        "should succeed if there are warnings, but those are treated as info",
        shouldSucceedIfThereAreWarningsButTreatedAsInfo.executeTest);
});
