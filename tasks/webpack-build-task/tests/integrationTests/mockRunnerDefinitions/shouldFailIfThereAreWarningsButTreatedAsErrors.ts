import runTestTask from "./shared/testTaskRunner";

runTestTask({
    treatErrorsAs: "info",
    treatWarningsAs: "errors",
    webpackCompilationResult: {
        hash: "",
        assets: [],
        children: [],
        chunks: [],
        time: 1,
        version: "",
        errors: [],
        warnings: ["warning"]
    },
    mockWriteFile: true
});
