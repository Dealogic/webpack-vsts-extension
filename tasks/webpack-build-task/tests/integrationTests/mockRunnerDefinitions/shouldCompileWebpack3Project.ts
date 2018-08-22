import runTestTask from "./shared/testTaskRunner";
import * as path from "path";

runTestTask({
    workingFolder: path.resolve(__dirname, "../../../../../samples/webpack-3"),
    mockWriteFile: true
});
