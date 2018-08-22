export default interface IMessage {
    filePath: string;
    start?: {
        line: number,
        offset: number
    };
    end?: {
        line: number,
        offset: number
    };
    message: string;
}
