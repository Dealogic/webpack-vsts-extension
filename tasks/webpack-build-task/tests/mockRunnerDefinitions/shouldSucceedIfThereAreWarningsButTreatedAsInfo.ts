import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationResult: {
        hash: "",
        time: 1,
        version: "",
        assets: [],
        children: [],
        chunks: [],
        errors: [],
        warnings: ["warning"]
    },
    jsonToStringResult: "shouldSucceedIfThereAreWarningsButTreatedAsInfoResult",
    treatErrorsAs: "info",
    treatWarningsAs: "info",
    mockWriteFile: true
});
