export interface IAsset {
    name: string;
    size: number;
    chunks: number[];
    chunkNames: string[];
    emitted: boolean;
};
