import { IAsset } from "./IAsset";
import { IChunk } from "./IChunk";

export interface IWebpackCompilationResult {
    warnings?: string[];
    errors?: string[];
    assets?: IAsset[];
    hash: string;
    version: string;
    time: number;
    chunks: IChunk[];
    children?: IWebpackCompilationResult[];
    toString: (webpackConfiguration: any) => string;
}
