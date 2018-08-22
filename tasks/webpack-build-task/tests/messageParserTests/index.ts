import shouldParseTsLintLoaderMessage from "./shouldParseTsLintLoaderMessage";
import shouldParseTsLoaderMessage from "./shouldParseTsLoaderMessage";

describe.only("loader message parser", () => {
    it("should parse tslint-loader message", shouldParseTsLintLoaderMessage);
    it("should parse ts-loader message", shouldParseTsLoaderMessage);
});
