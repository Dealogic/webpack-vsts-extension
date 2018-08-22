export default interface IMessage {
    filePath: string;
    start?: {
        line: number,
        position: number
    };
    end?: {
        line: number,
        position: number
    };
    message: string;
}
