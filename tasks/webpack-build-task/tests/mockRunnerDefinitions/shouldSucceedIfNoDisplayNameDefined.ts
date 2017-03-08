import { TaskMockRunner } from "vsts-task-lib/mock-run";
import * as path from "path";

const taskPath = path.join(__dirname, "..", "..", "index.js");
const taskMockRunner = new TaskMockRunner(taskPath);

let webpackJsLocation = "node_modules/webpack/bin/webpack.js";
const workingFolder = path.join(__dirname);
const webpackArguments = "--config webpack.dist.config.js";

taskMockRunner.setInput("webpackJsLocation", webpackJsLocation);
taskMockRunner.setInput("arguments", webpackArguments);
taskMockRunner.setInput("workingFolder", workingFolder);

taskMockRunner.setAnswers({
    exist: {
        "C:\W\GitHub\Dealogic\webpack-vsts-extension\tasks\webpack-build-task\webpack.webpack.result.md": false
    }
});

taskMockRunner.registerMock("child_process", {
    execSync: (webpackCommand: string) => {
        const expectedWebpackCommand = `node "${path.resolve(workingFolder, webpackJsLocation)}" --json ${webpackArguments}`;

        if (webpackCommand === expectedWebpackCommand) {
            return JSON.stringify({
                hash: "hash",
                version: "1.0.0",
                time: "1",
                errors: [],
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
        }
    }
});

taskMockRunner.run();
