import runTestTask from "./shared/testTaskRunner";
import * as path from "path";

runTestTask({
    workingFolder: path.resolve(__dirname, "../../../../../samples/multiple-webpack-build-steps/webpack-project-one"),
    mockWriteFile: true
});
