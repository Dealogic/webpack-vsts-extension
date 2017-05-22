import { TaskMockRunner } from "vsts-task-lib/mock-run";
import * as path from "path";

export default function(taskMockRunner: TaskMockRunner, workingFolder: string, webpackJsLocation: string): void {
    const webpackJsBinLocationAbsolutePath = path.resolve(workingFolder, webpackJsLocation);
    const webpackJsLibLocationAbsolutePath = path.resolve(path.dirname(webpackJsBinLocationAbsolutePath), "../lib/webpack");

    taskMockRunner.registerMock(webpackJsLibLocationAbsolutePath, {
        Stats: {
            jsonToString: (json) => {
                if (json) {
                    return "formatted output";
                }

                return "unformatted output";
            }
        }
    });
};
