import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationResult: {
        toJson: () => {
            return {
                errors: [],
                warnings: ["warning"]
            };
        },
        toString: (config: any) => {
            return "shouldSucceedIfThereAreWarningsButTreatedAsInfoResult";
        }
    },
    treatErrorsAs: "info",
    treatWarningsAs: "info",
    mockWriteFile: true
});
