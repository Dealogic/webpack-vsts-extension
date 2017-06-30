import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationResult: {
        hash: "hash",
        version: "1.0.0",
        time: 1,
        errors: [],
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
    nullTaskDisplayName: true
});
