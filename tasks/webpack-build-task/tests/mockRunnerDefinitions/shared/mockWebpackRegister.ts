import { TaskMockRunner } from "vsts-task-lib/mock-run";
import * as path from "path";

export default function(taskMockRunner: TaskMockRunner, workingFolder: string, webpackJsLocation: string): void {
    const webpackJsLocationAbsolutePath = path.resolve(workingFolder, webpackJsLocation);
    const statsLocationAbsolutePath = path.resolve(path.dirname(webpackJsLocationAbsolutePath), "../lib/Stats");

    taskMockRunner.registerMock(statsLocationAbsolutePath, {
        jsonToString: (json) => {
            if (json) {
                return "formatted output";
            }

            return "unformatted output";
        }
    });
};
