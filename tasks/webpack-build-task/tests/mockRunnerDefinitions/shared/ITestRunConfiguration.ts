import { IWebpackBuildResult } from "../../../webpackBuild";

export interface ITestRunConfiguration {
    workingFolder?: string;
    webpackModuleLocation?: string;
    webpackConfigLocation?: string;
    treatErrorsAs?: string;
    treatWarningsAs?: string;
    webpackCompilationError?: any;
    webpackCompilationResult: IWebpackBuildResult;
    webpackConfig?: any,
    taskDisplayName?: string;
    mockWriteFile?: boolean;
    nullTaskDisplayName?: boolean;
};
