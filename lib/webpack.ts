import { execSync, ExecOptionsWithStringEncoding } from "child_process";
import { IWebpackResult } from "./IWebpackResult";

const executeWebpackCommand = (currentWorkingDirectory: string, webpackArguments: string) => {
    const webpackCommand = `node "${currentWorkingDirectory}\\node_modules\\webpack\\bin\\webpack.js" ${webpackArguments} --json`;

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
    const result = <IWebpackResult>JSON.parse(fixedStdOut);

    return result;
};

export function build(currentWorkingDirectory: string, webpackArguments: string): IWebpackResult {
    const stdout = executeWebpackCommand(currentWorkingDirectory, webpackArguments);

    return processStdOut(stdout);
}
