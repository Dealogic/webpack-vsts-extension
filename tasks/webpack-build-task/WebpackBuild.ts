import { execSync, ExecOptionsWithStringEncoding } from "child_process";
import * as path from "path";
import { IWebpackBuildResult } from "./IWebpackBuildResult";
import * as tl from "vsts-task-lib/task";

const executeWebpackCommand = (workingFolder: string, webpackJsLocation: string, webpackArguments: string) => {
    if (webpackArguments) {
        webpackArguments = `--json ${webpackArguments}`;
    } else {
        webpackArguments = "--json";
    }

    tl.cd(workingFolder);
    webpackJsLocation = path.resolve(workingFolder, webpackJsLocation);
    const webpackCommand = `node "${webpackJsLocation}" ${webpackArguments}`;

    console.log(`Running command: ${webpackCommand}`);

    const options: ExecOptionsWithStringEncoding = {
        encoding: "utf8"
    };

    return execSync(webpackCommand, options);
};

const fixStdOut = (stdout: string) => {
    return stdout.slice(stdout.indexOf("{"), stdout.lastIndexOf("}") + 1);
};

const processStdOut = (stdout: string) => {
    const fixedStdOut = fixStdOut(stdout);
    const result = <IWebpackBuildResult>JSON.parse(fixedStdOut);

    return result;
};

export function build(currentWorkingDirectory: string, webpackJsLocation: string, webpackArguments: string): IWebpackBuildResult {
    const stdout = executeWebpackCommand(currentWorkingDirectory, webpackJsLocation, webpackArguments);

    return processStdOut(stdout);
}
