import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationError: new Error("error happened during compilation of the webpack project"),
    webpackCompilationResult: {
        hash: "hash",
        version: "1.0.0",
        time: 1,
        errors: ["error"],
        warnings: [],
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
    treatErrorsAs: "info",
    treatWarningsAs: "info"
});
