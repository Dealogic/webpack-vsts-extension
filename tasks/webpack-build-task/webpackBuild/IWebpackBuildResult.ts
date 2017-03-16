import { IAsset } from "./IAsset";
import { IChunk } from "./IChunk";

export interface IWebpackBuildResult {
    warnings?: string[];
    errors?: string[];
    assets?: IAsset[];
    hash: string;
    version: string;
    time: number;
    chunks: IChunk[];
}
