import { IWebpackCompilationResult } from "./IWebpackCompilationResult";
import resolveWebpackStats from "../webpackStatsResolver";
import executeWebpackCli from "./WebpackCliExecutor";

const fixStdOut = (stdout: string) => {
    return stdout.slice(stdout.indexOf("{"), stdout.lastIndexOf("}") + 1);
};

const processStdOut = (stdout: string) => {
    const fixedStdOut = fixStdOut(stdout);
    const result = JSON.parse(fixedStdOut) as IWebpackCompilationResult;

    return result;
};

const hasDisplayArgument = (webpackCliArguments: string, displayType: string) => {
    if (!webpackCliArguments) {
        return false;
    }

    return webpackCliArguments.indexOf(`--display ${displayType}`) >= 0
        || webpackCliArguments.indexOf(`--display '${displayType}'`) >= 0
        || webpackCliArguments.indexOf(`--display "${displayType}"`) >= 0;
};

const decorateWithShowErrorsAndShowWarnings = (result: IWebpackCompilationResult, webpackCliArguments: string): void => {
    result._showErrors = !hasDisplayArgument(webpackCliArguments, "none");
    result._showWarnings =
        !hasDisplayArgument(webpackCliArguments, "none")
        && !hasDisplayArgument(webpackCliArguments, "errors-only")
        && !hasDisplayArgument(webpackCliArguments, "minimal");

    if (hasDisplayArgument(webpackCliArguments, "none")) {
        result.modules = undefined;
    }
};

export function compile(
    workingFolder: string,
    webpackCliLocation: string,
    webpackCliArguments: string,
    statsjsLocation: string,
    nodeCliArguments: string): IWebpackCompilationResult {

    console.log("compilation of the webpack project is started");

    let stdout: string;
    let result: IWebpackCompilationResult;
    let error: any;

    try {
        stdout = executeWebpackCli(workingFolder, webpackCliLocation, webpackCliArguments, nodeCliArguments);
    } catch (executeWebpackCliError) {
        error = executeWebpackCliError;
        stdout = executeWebpackCliError.stdout;
    }

    if (stdout) {
        try {
            result = processStdOut(stdout);
            decorateWithShowErrorsAndShowWarnings(result, webpackCliArguments);
        } catch (processStdOutError) {
            throw {
                processStdOutError,
                error
            };
        }
    } else {
        throw error;
    }

    const stats = resolveWebpackStats(workingFolder, statsjsLocation);
    console.log("compilation of the webpack project is done");
    console.log(stats.jsonToString(result));

    return result;
}
