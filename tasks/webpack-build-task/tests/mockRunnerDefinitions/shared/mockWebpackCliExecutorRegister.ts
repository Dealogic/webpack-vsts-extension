import { TaskMockRunner } from "vsts-task-lib/mock-run";
import { IWebpackCompilationResult } from "../../../webpackCompiler";

const registerMockWebpackCliExecutorCompiler = (taskMockRunner: TaskMockRunner, result: IWebpackCompilationResult, webpackCompilationError: any) => {
    class MockWebpackCliExecutor {
        public static default(workingFolder: string, webpackCliLocation: string, webpackCliArguments: string): string {
            if (webpackCompilationError) {
                throw webpackCompilationError;
            }

            return JSON.stringify(result);
        }
    }

    taskMockRunner.registerMock("./WebpackCliExecutor", MockWebpackCliExecutor);
};

export default registerMockWebpackCliExecutorCompiler;
