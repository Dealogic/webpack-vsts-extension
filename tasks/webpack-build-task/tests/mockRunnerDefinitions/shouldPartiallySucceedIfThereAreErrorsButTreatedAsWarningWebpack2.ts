import { TaskMockRunner } from "vsts-task-lib/mock-run";
import * as path from "path";
import * as fs from "fs";
import registerMockWebpack from "./shared/mockWebpackRegister";

const taskPath = path.join(__dirname, "..", "..", "index.js");
const taskMockRunner = new TaskMockRunner(taskPath);

let webpackJsLocation = "node_modules/webpack/bin/webpack.js";
const workingFolder = path.join(__dirname, "..");
const webpackArguments = "--config webpack.dist.config.js";

taskMockRunner.setInput("webpackJsLocation", webpackJsLocation);
taskMockRunner.setInput("arguments", webpackArguments);
taskMockRunner.setInput("workingFolder", workingFolder);
taskMockRunner.setInput("treatErrorsAs", "warnings");
taskMockRunner.setInput("treatWarningsAs", "warnings");

taskMockRunner.setAnswers({
    exist: {
        "": false
    }
});

taskMockRunner.registerMockExport("getVariable", (variableName: string) => {
    if (variableName === "task.displayname") {
        return "webpack test";
    }

    return "";
});

registerMockWebpack(taskMockRunner, workingFolder, webpackJsLocation);

taskMockRunner.registerMockExport("writeFile", (resultFileName: string, content: string) => {
    fs.writeFileSync(resultFileName, content, { encoding: "utf8" });
});

taskMockRunner.registerMock("child_process", {
    execSync: (webpackCommand: string) => {
        const expectedWebpackCommand = `node "${path.resolve(workingFolder, webpackJsLocation)}" --json ${webpackArguments}`;

        const stdout = JSON.stringify({
                hash: "hash",
                version: "1.0.0",
                time: "1",
                errors: ["error"],
                warnings: [],
                assets: [],
                chunks: [
                    {
                        modules: [
                            {
                            }
                        ]
                    }
                ]
            });

        if (webpackCommand === expectedWebpackCommand) {
            throw {
                stdout
            };
        }
    }
});

taskMockRunner.run();
