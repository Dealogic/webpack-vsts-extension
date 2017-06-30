import { TaskMockRunner } from "vsts-task-lib/mock-run";
import { IWebpackCompilationResult } from "../../../webpackCompiler";

const registerMockWebpackModuleResolver = (taskMockRunner: TaskMockRunner, webpackConfig: any, error: any, result: IWebpackCompilationResult) => {
    class MockWebpack {
        public run(done: (error: any, result: IWebpackCompilationResult) => void): void {
            if (done) {
                done(error, result);
            }
        }
    }

    taskMockRunner.registerMock("./webpackModuleResolver", {
        resolveWebpackConfig: () => {
            return webpackConfig;
        },
        resolveWebpackModule: () => {
            return MockWebpack;
        }
    });
};

export default registerMockWebpackModuleResolver;
