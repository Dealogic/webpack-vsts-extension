import { TaskMockRunner } from "vsts-task-lib/mock-run";
import { IWebpackCompilationResult } from "../../../../webpackCompiler/index";
import IWebpackStats from "../../../../webpackStatsResolver/IWebpackStats";

const registerMockWebpackStatsResolver = (taskMockRunner: TaskMockRunner) => {
    class MockWebpackStatsResolver {
        public static default(workingFolder: string, statsJsLocation: string): IWebpackStats {
            return {
                jsonToString: (webpackCompilationResult: IWebpackCompilationResult) => {
                    return JSON.stringify(webpackCompilationResult);
                }
            };
        }
    }

    taskMockRunner.registerMock("../webpackStatsResolver", MockWebpackStatsResolver);
};

export default registerMockWebpackStatsResolver;
