import * as path from "path";
import { execSync, ExecOptionsWithStringEncoding } from "child_process";
import * as tl from "vsts-task-lib/task";

const executeWebpackCli = (workingFolder: string, webpackCliLocation: string, webpackCliArguments: string, nodeCliArguments: string) => {
    if (webpackCliArguments) {
        webpackCliArguments = `--json ${webpackCliArguments}`;
    } else {
        webpackCliArguments = "--json";
    }

    if (!nodeCliArguments) {
        nodeCliArguments = "";
    }

    tl.cd(workingFolder);
    webpackCliLocation = path.resolve(workingFolder, webpackCliLocation);
    const webpackCliCommand = `node ${nodeCliArguments} "${webpackCliLocation}" ${webpackCliArguments}`;

    console.log(`executing the command: ${webpackCliCommand}`);

    const options: ExecOptionsWithStringEncoding = {
        encoding: "utf8"
    };

    return execSync(webpackCliCommand, options);
};

export default executeWebpackCli;
