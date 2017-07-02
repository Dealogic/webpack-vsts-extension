import { IWebpackCompilationResultAsJson } from "./IWebpackCompilationResultAsJson";

export interface IWebpackCompilationResult {
    toJson: (webpackConif: any, forToString: boolean) => IWebpackCompilationResultAsJson;
    toString: (webpackConfig: any) => string;
}
