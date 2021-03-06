import parseTsLintLoaderMessage from "../../taskResultPublisher/parseTsLintLoaderMessage";
import { assert } from "chai";

export default () => {
    const unparsedTsLintLoaderMessage = "./src/index.ts\nModule Error (from ./node_modules/tslint-loader/index.js):\n[132, 281]: Missing semicolon\n";
    const parsedMessage = parseTsLintLoaderMessage(unparsedTsLintLoaderMessage);

    assert.equal(parsedMessage.filePath, "/src/index.ts");
    assert.equal(parsedMessage.message, unparsedTsLintLoaderMessage);
    assert.equal(parsedMessage.start.line, 132);
    assert.equal(parsedMessage.start.offset, 281);
    assert.equal(parsedMessage.end.line, 132);
    assert.equal(parsedMessage.end.offset, 281);
};
