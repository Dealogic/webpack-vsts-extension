import IMessage from "./IMessage";

export default (taskDisplayName: string, message: string): IMessage => {
    const lines = message.split("\n");

    if (!lines[2].startsWith("[tsl] ")) {
        return null;
    }

    const filePath = lines[1].slice(2);
    const sublines = lines[2].split("\r\n");
    const line = Number(lines[2].slice(sublines[0].lastIndexOf("(") + 1, sublines[0].lastIndexOf(",")));
    const position = Number(lines[2].slice(sublines[0].lastIndexOf(",") + 1, sublines[0].lastIndexOf(")")));
    const messageWithTaskDisplayName = `${taskDisplayName}: ${message}`;

    return {
        filePath,
        start: {
            line,
            position
        },
        end: {
            line,
            position
        },
        message: messageWithTaskDisplayName
    };
};
