import * as path from "path";
import IWebpackStats from "./IWebpackStats";

const resolveWebpackStats = (workingFolder: string, statsJsLocation: string) => {
    return require(path.resolve(workingFolder, statsJsLocation)) as IWebpackStats;
};

export default resolveWebpackStats;
export {
    IWebpackStats
};
