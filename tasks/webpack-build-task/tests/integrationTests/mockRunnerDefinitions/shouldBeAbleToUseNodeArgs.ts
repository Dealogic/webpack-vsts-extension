import runTestTask from "./shared/testTaskRunner";
import * as path from "path";

runTestTask({
    nodeCliArguments: "--max_old_space_size=4096",
    workingFolder: path.resolve(__dirname, "../../../../../samples/webpack-ts-config"),
    mockWriteFile: true
});
