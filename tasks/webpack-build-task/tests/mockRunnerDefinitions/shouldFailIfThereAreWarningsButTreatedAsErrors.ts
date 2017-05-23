import runTestTask from "./shared/testTaskRunner";

runTestTask({
    treatErrorsAs: "info",
    treatWarningsAs: "errors",
    webpackCompilationResult: {
        hash: "hash",
        version: "1.0.0",
        time: 1,
        errors: [],
        warnings: ["warning"],
        assets: [],
        chunks: [
            {
                modules: [
                    {
                    }
                ]
            }
        ]
    },
    mockWriteFile: true
});
