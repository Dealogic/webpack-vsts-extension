import { TaskMockRunner } from "vsts-task-lib/mock-run";
import { IWebpackBuildResult } from "../../../webpackBuild";

const registerMockWebpackModule = (taskMockRunner: TaskMockRunner, webpackModuleLocation: string, error: any, result: IWebpackBuildResult) => {
    class MockWebpack {
        public run(done: (error: any, result: IWebpackBuildResult) => void): void {
            if (done) {
                done(error, result);
            }
        }
    }

    taskMockRunner.registerMock(webpackModuleLocation, MockWebpack);
};

export default registerMockWebpackModule;
