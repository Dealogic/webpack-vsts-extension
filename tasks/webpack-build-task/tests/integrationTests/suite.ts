import * as fs from "fs";
import * as shouldCompileSimpleWebpackProject from "./shouldCompileSimpleWebpackProject";
import * as shouldCompileSimpleWebpackProjectWithIssues from "./shouldCompileSimpleWebpackProjectWithIssues";
import * as shouldCompileWebpack2Project from "./shouldCompileWebpack2Project";
import * as shouldCompileWebpack3Project from "./shouldCompileWebpack3Project";
import * as shouldCompileWebpack3ProjectWithDisplayNone from "./shouldCompileWebpack3ProjectWithDisplayNone";
import * as shouldCompileWebpack3ProjectWithIssues from "./shouldCompileWebpack3ProjectWithIssues";
import * as shouldCompileWebpack4Project from "./shouldCompileWebpack4Project";
import * as shouldCompileWebpack4ProjectWithDisplayNone from "./shouldCompileWebpack4ProjectWithDisplayNone";
import * as shouldCompileWebpackTypeScriptConfigProject from "./shouldCompileWebpackTypeScriptConfigProject";
import * as shouldFailIfThereAreErrorsAndWarnings from "./shouldFailIfThereAreErrorsAndWarnings";
import * as shouldFailIfThereAreWarningsButTreatedAsErrors from "./shouldFailIfThereAreWarningsButTreatedAsErrors";
import * as shouldGenerateMarkdownFileInCaseOfASuccessfulRun from "./shouldGenerateMarkdownFileInCaseOfASuccessfulRun";
import * as shouldHideErrorsInCaseOfNoneDisplayOption from "./shouldHideErrorsInCaseOfNoneDisplayOption";
import * as shouldHideWarningsInCaseOfErrorsOnlyDisplayOption from "./shouldHideWarningsInCaseOfErrorsOnlyDisplayOption";
import * as shouldHideWarningsInCaseOfMinimalDisplayOption from "./shouldHideWarningsInCaseOfMinimalDisplayOption";
import * as shouldHideWarningsInCaseOfNoneDisplayOption from "./shouldHideWarningsInCaseOfNoneDisplayOption";
import * as shouldLogInformationAboutTheProcess from "./shouldLogInformationAboutTheProcess";
import * as shouldPartiallySucceedIfNoErrorsButAtLeastOneWarning from "./shouldPartiallySucceedIfNoErrorsButAtLeastOneWarning";
import * as shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarning from "./shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarning";
import * as shouldReplaceBracketsToParenthesisInTaskName from "./shouldReplaceBracketsToParenthesisInTaskName";
import * as shouldReportErrorDetailInCaseOfWebpackBuildFailure from "./shouldReportErrorDetailInCaseOfWebpackBuildFailure";
import * as shouldSucceedIfNoDisplayNameDefined from "./shouldSucceedIfNoDisplayNameDefined";
import * as shouldSucceedIfNoErrorsAndWarnings from "./shouldSucceedIfNoErrorsAndWarnings";
import * as shouldSucceedIfThereAreErrorsButTreatedAsInfo from "./shouldSucceedIfThereAreErrorsButTreatedAsInfo";
import * as shouldSucceedIfThereAreWarningsButTreatedAsInfo from "./shouldSucceedIfThereAreWarningsButTreatedAsInfo";

describe("webpack build task", () => {
    after((done: MochaDone) => {
        const filesToDelete = [
            "../../../samples/multiple-webpack-build-steps/webpack-project-one/webpack test.webpack.result.md",
            "../../../samples/multiple-webpack-build-steps/webpack-project-two/webpack test.webpack.result.md",
            "../../../samples/webpack-2/webpack test.webpack.result.md",
            "../../../samples/webpack-3/webpack test.webpack.result.md",
            "../../../samples/webpack-3-with-issues/webpack test.webpack.result.md",
            "../../../samples/webpack-ts-config/webpack test.webpack.result.md",
            "../../../samples/webpack-4/webpack test.webpack.result.md",
            "tests/integrationTests/webpack test.webpack.result.md",
            "tests/integrationTests/webpack (something in brackets).webpack.result.md"
        ];

        for (const fileToDelete of filesToDelete) {
            if (fs.existsSync(fileToDelete)) {
                fs.unlinkSync(fileToDelete);
            }
        }

        done();
    });

    it(
        "should compile simple webpack project",
        shouldCompileSimpleWebpackProject.executeTest
    );

    it(
        "should compile simple webpack project with issues",
        shouldCompileSimpleWebpackProjectWithIssues.executeTest
    );

    it(
        "should compile webpack 2 project",
        shouldCompileWebpack2Project.executeTest
    );

    it(
        "should compile webpack 3 project",
        shouldCompileWebpack3Project.executeTest
    );

    it(
        "should compile webpack 3 project with display none",
        shouldCompileWebpack3ProjectWithDisplayNone.executeTest
    );

    it(
        "should compile webpack 3 project with issues",
        shouldCompileWebpack3ProjectWithIssues.executeTest
    );

    it(
        "should compile webpack 4 project",
        shouldCompileWebpack4Project.executeTest
    );

    it(
        "should compile webpack 4 project with display none",
        shouldCompileWebpack4ProjectWithDisplayNone.executeTest
    );

    it(
        "should compile webpack typescript config project",
        shouldCompileWebpackTypeScriptConfigProject.executeTest
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
        "should hide errors in case of none display option",
        shouldHideErrorsInCaseOfNoneDisplayOption.executeTest);

    it(
        "should hide warnings in case of errors-only display option",
        shouldHideWarningsInCaseOfErrorsOnlyDisplayOption.executeTest);

    it(
        "should hide warnings in case ff minimal display option",
        shouldHideWarningsInCaseOfMinimalDisplayOption.executeTest);

    it(
        "should hide warnings in case of none display option",
        shouldHideWarningsInCaseOfNoneDisplayOption.executeTest);

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
        "should replace brackets to parenthesis in task name",
        shouldReplaceBracketsToParenthesisInTaskName.executeTest
    );

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
