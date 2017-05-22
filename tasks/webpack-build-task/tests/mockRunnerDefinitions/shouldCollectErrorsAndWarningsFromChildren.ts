import { TaskMockRunner } from "vsts-task-lib/mock-run";
import * as path from "path";
import registerMockWebpack from "./shared/mockWebpackRegister";

const taskPath = path.join(__dirname, "..", "..", "index.js");
const taskMockRunner = new TaskMockRunner(taskPath);

const webpackJsLocation = "node_modules/webpack/bin/webpack.js";
const workingFolder = path.join(__dirname);
const webpackArguments = "--config webpack.dist.config.js";

taskMockRunner.setInput("webpackJsLocation", webpackJsLocation);
taskMockRunner.setInput("arguments", webpackArguments);
taskMockRunner.setInput("workingFolder", workingFolder);
taskMockRunner.setInput("treatErrorsAs", "errors");
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

taskMockRunner.registerMock("child_process", {
    execSync: (webpackCommand: string) => {
        const expectedWebpackCommand = `node "${path.resolve(workingFolder, webpackJsLocation)}" --json ${webpackArguments}`;

        if (webpackCommand === expectedWebpackCommand) {
            const childForFirstChild = {
                hash: "hash",
                version: "1.0.0",
                time: "1",
                errors: ["child-for-first-child-error"],
                warnings: ["child-for-first-child-warning"],
                assets: [],
                chunks: [
                    {
                        modules: [
                            {
                            }
                        ]
                    }
                ]
            };

            const firstChild = {
                hash: "hash",
                version: "1.0.0",
                time: "1",
                errors: ["first-child-error"],
                warnings: ["first-child-warning"],
                assets: [],
                chunks: [
                    {
                        modules: [
                            {
                            }
                        ]
                    }
                ],
                children: [
                    childForFirstChild
                ]
            };

            const secondChild = {
                hash: "hash",
                version: "1.0.0",
                time: "1",
                errors: ["second-child-error"],
                warnings: ["second-child-warning"],
                assets: [],
                chunks: [
                    {
                        modules: [
                            {
                            }
                        ]
                    }
                ]
            };

            const stdout = JSON.stringify({
                hash: "hash",
                version: "1.0.0",
                time: "1",
                errors: ["root-error"],
                warnings: ["root-warning"],
                assets: [],
                chunks: [
                    {
                        modules: [
                            {
                            }
                        ]
                    }
                ],
                children: [
                    firstChild,
                    secondChild
                ]
            });

            throw {
                stdout
            };
        }
    }
});

taskMockRunner.run();
