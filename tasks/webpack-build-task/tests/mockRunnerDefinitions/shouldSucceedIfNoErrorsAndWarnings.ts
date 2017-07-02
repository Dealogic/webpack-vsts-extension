import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationResult: {
        toJson: () => {
            return {
                errors: [],
                warnings: []
            };
        },
        toString: (config: any) => {
            return "shouldSucceedIfNoErrorsAndWarningsResult";
        }
    },
    mockWriteFile: true
});
