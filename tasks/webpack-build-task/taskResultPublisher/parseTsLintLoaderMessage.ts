import IMessage from "./IMessage";

export default (message: string): IMessage => {
    if (message.indexOf("/tslint-loader/") === -1) {
        return null;
    }

    const lines = message.split("\n");

    const filePath = lines[0].slice(1);
    const line = Number(lines[2].slice(1, lines[2].indexOf(",")));
    const offset = Number(lines[2].slice(lines[2].indexOf(",") + 1, lines[2].indexOf("]")));

    return {
        filePath,
        start: {
            line,
            offset
        },
        end: {
            line,
            offset
        },
        message
    };
};
