import shouldParseTsLintLoaderMessage from "./shouldParseTsLintLoaderMessage";
import shouldParseTsLoaderMessage from "./shouldParseTsLoaderMessage";

describe("loader message parser", () => {
    it("should parse tslint-loader message", shouldParseTsLintLoaderMessage);
    it("should parse ts-loader message", shouldParseTsLoaderMessage);
});
