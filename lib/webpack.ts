import { exec } from "child_process";

export function build(currentWorkingDirectory: string, webpackArguments: string, callback: (result: any, error: any) => void): void {
    const webpackCommand = `${currentWorkingDirectory}webpack ${webpackArguments} --json > webpack.result.json`;

    console.log(`Running command: ${webpackCommand}`);
    exec(webpackCommand, (error: Error) => {
        if (error) {
            callback(null, error);
        } else {
            callback({}, null);
        }
    });
}
