import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationResult: {
        toJson: () => {
            return {
                errors: ["error"],
                warnings: []
            };
        },
        toString: (config: any) => {
            return "shouldSucceedIfThereAreErrorsButTreatedAsInfoResult";
        }
    },
    treatErrorsAs: "info",
    treatWarningsAs: "info",
    mockWriteFile: true
});
