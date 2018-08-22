import runTestTask from "./shared/testTaskRunner";

runTestTask({
    treatErrorsAs: "warnings",
    webpackCompilationResult: {
        hash: "",
        time: 1,
        version: "",
        assets: [],
        children: [],
        chunks: [],
        errors: ["error"],
        warnings: []
    },
    mockWriteFile: true
});
