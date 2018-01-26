import { IWebpackCompilationResult } from "../webpackCompiler/index";

export default interface IWebpackStats {
    jsonToString: (result: IWebpackCompilationResult) => string;
}
