import { TaskMockRunner } from "vsts-task-lib/mock-run";

const registerMockWebpackConfig = (taskMockRunner: TaskMockRunner, webpackConfigLocation: string, webpackConfig: any) => {
    taskMockRunner.registerMock(webpackConfigLocation, webpackConfig);
};

export default registerMockWebpackConfig;
