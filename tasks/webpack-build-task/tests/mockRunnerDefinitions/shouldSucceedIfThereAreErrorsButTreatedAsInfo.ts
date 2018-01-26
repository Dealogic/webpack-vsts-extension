import runTestTask from "./shared/testTaskRunner";

runTestTask({
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
    jsonToStringResult: "shouldSucceedIfThereAreErrorsButTreatedAsInfoResult",
    treatErrorsAs: "info",
    treatWarningsAs: "info",
    mockWriteFile: true
});
