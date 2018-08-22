import parseTsLoaderMessage from "../../taskResultPublisher/parseTsLoaderMessage";
import { assert } from "chai";

export default () => {
    // tslint:disable-next-line:max-line-length
    const unparsedTsLoaderMessage = `C:\\W\\Playground\\webpack-format-messages\\src\\index.ts\n./src/index.ts\n[tsl] ERROR in C:\\W\\Playground\\webpack-format-messages\\src\\index.ts(456,918)\r\n      TS2339: Property \'lo\' does not exist on type \'Console\'.`;
    const parsedMessage = parseTsLoaderMessage("task", unparsedTsLoaderMessage);

    assert.equal(parsedMessage.filePath, "src/index.ts");
    assert.equal(parsedMessage.message, `task: ${unparsedTsLoaderMessage}`);
    assert.equal(parsedMessage.start.line, 456);
    assert.equal(parsedMessage.start.offset, 918);
    assert.equal(parsedMessage.end.line, 456);
    assert.equal(parsedMessage.end.offset, 918);
};
