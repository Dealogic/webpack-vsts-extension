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
            return "shouldPartiallySucceedIfThereAreErrorsButTreatedAsWarningResult";
        }
    },
    treatErrorsAs: "warnings",
    mockWriteFile: true
});
