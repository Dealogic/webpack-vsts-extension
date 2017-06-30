import * as fs from "fs";
import * as shouldCollectErrorsAndWarningsFromChildren from "./shouldCollectErrorsAndWarningsFromChildren";
import * as shouldCompileSimpleWebpackProject from "./shouldCompileSimpleWebpackProject";
import * as shouldCompileWebpack2Project from "./shouldCompileWebpack2Project";
import * as shouldFailIfThereAreErrorsAndWarnings from "./shouldFailIfThereAreErrorsAndWarnings";
import * as shouldFailIfThereAreWarningsButTreatedAsErrors from "./shouldFailIfThereAreWarningsButTreatedAsErrors";
import * as shouldGenerateMarkdownFileInCaseOfASuccessfulRun from "./shouldGenerateMarkdownFileInCaseOfASuccessfulRun";
import * as shouldLogInformationAboutTheProcess from "./shouldLogInformationAboutTheProcess";
import * as shouldPartiallySucceedIfNoErrorsButAtLeastOneWarning from "./shouldPartiallySucceedIfNoErrorsButAtLeastOneWarning";
import * as shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarning from "./shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarning";
import * as shouldReportErrorDetailInCaseOfWebpackBuildFailure from "./shouldReportErrorDetailInCaseOfWebpackBuildFailure";
import * as shouldSucceedIfNoDisplayNameDefined from "./shouldSucceedIfNoDisplayNameDefined";
import * as shouldSucceedIfNoErrorsAndWarnings from "./shouldSucceedIfNoErrorsAndWarnings";
import * as shouldSucceedIfThereAreErrorsButTreatedAsInfo from "./shouldSucceedIfThereAreErrorsButTreatedAsInfo";
import * as shouldSucceedIfThereAreWarningsButTreatedAsInfo from "./shouldSucceedIfThereAreWarningsButTreatedAsInfo";

describe("webpack build task", () => {
    after((done: MochaDone) => {
        const filesToDelete = [
            "../../samples/multiple-webpack-build-steps/webpack-project-one/webpack test.webpack.result.md",
            "../../samples/webpack-2/webpack test.webpack.result.md",
            "tests/webpack test.webpack.result.md"
        ];

        for (const fileToDelete of filesToDelete) {
            if (fs.existsSync(fileToDelete)) {
                fs.unlinkSync(fileToDelete);
            }
        }

        done();
    });

    it(
        "should collect errors and warnings from children",
        shouldCollectErrorsAndWarningsFromChildren.executeTest
    );

    it(
        "should compile simple webpack project",
        shouldCompileSimpleWebpackProject.executeTest
    );

    it(
        "should compile webpack 2 project",
        shouldCompileWebpack2Project.executeTest
    );

    it(
        "should fail if there are errors and warnings",
        shouldFailIfThereAreErrorsAndWarnings.executeTest);

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
        "should succeed if there are warnings, but those are treated as info",
        shouldSucceedIfThereAreWarningsButTreatedAsInfo.executeTest);
});
