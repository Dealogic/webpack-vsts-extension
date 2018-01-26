import { TaskMockRunner } from "vsts-task-lib/mock-run";
import { IWebpackCompilationResult } from "../../../webpackCompiler/index";
import IWebpackStats from "../../../webpackStatsResolver/IWebpackStats";

const registerMockWebpackStatsResolver = (taskMockRunner: TaskMockRunner, jsonToStringResult: string) => {
    class MockWebpackStatsResolver {
        public static default(workingFolder: string, statsJsLocation: string): IWebpackStats {
            return {
                jsonToString: (webpackCompilationResult: IWebpackCompilationResult) => {
                    return jsonToStringResult;
                }
            };
        }
    }

    taskMockRunner.registerMock("../webpackStatsResolver", MockWebpackStatsResolver);
};

export default registerMockWebpackStatsResolver;
