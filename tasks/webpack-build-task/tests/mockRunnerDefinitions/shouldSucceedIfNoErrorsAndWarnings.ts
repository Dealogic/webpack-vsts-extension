import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationResult: {
        hash: "hash",
        version: "1.0.0",
        time: 1,
        errors: [],
        warnings: [],
        assets: [
            {
                name: "main.js",
                size: 100,
                chunks: [1, 2],
                chunkNames: ["1", "2"],
                emitted: true
            }
        ],
        chunks: [
            {
                modules: [
                    {
                    },
                    {
                    }
                ]
            },
            {
                modules: [
                    {
                    }
                ]
            }
        ],
        toString: (config: any) => {
            return "shouldSucceedIfNoErrorsAndWarningsResult";
        }
    },
    mockWriteFile: true
});
