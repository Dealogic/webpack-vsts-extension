import { IWebpackCompilationResult } from "../../../webpackCompiler";

export interface ITestRunConfiguration {
    workingFolder?: string;
    webpackModuleLocation?: string;
    webpackConfigLocation?: string;
    treatErrorsAs?: string;
    treatWarningsAs?: string;
    webpackCompilationError?: any;
    webpackCompilationResult?: IWebpackCompilationResult;
    webpackConfig?: any;
    taskDisplayName?: string;
    mockWriteFile?: boolean;
    nullTaskDisplayName?: boolean;
}
