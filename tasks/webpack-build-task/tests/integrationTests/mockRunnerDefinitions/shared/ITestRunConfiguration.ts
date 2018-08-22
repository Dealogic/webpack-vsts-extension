import { IWebpackCompilationResult } from "../../../../webpackCompiler";

export interface ITestRunConfiguration {
    workingFolder?: string;
    webpackCliLocation?: string;
    webpackCliArguments?: string;
    statsjsLocation?: string;
    treatErrorsAs?: string;
    treatWarningsAs?: string;
    webpackCompilationError?: any;
    webpackCompilationResult?: IWebpackCompilationResult;
    taskDisplayName?: string;
    mockWriteFile?: boolean;
    nullTaskDisplayName?: boolean;
}
