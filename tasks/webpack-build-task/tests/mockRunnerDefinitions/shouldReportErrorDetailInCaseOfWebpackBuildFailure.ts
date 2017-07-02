import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationError: new Error("error happened during compilation of the webpack project"),
    webpackCompilationResult: {
        toJson: () => {
            return {
                errors: ["error"],
                warnings: []
            };
        }
    },
    treatErrorsAs: "info",
    treatWarningsAs: "info"
});
