import { TaskMockRunner } from "vsts-task-lib/mock-run";
import { IWebpackCompilationResult } from "../../../webpackCompiler";

const registerMockWebpackModule = (taskMockRunner: TaskMockRunner, webpackModuleLocation: string, error: any, result: IWebpackCompilationResult) => {
    class MockWebpack {
        public run(done: (error: any, result: IWebpackCompilationResult) => void): void {
            if (done) {
                done(error, result);
            }
        }
    }

    taskMockRunner.registerMock(webpackModuleLocation, MockWebpack);
};

export default registerMockWebpackModule;
