import runTestTask from "./shared/testTaskRunner";

runTestTask({
    treatErrorsAs: "info",
    treatWarningsAs: "errors",
    webpackCompilationResult: {
        toJson: () => {
            return {
                errors: [],
                warnings: ["warning"]
            };
        },
        toString: (config: any) => {
            return "shouldFailIfThereAreWarningsButTreatedAsErrorsResult";
        }
    },
    mockWriteFile: true
});
