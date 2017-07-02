import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationResult: {
        toJson: () => {
            return {
                errors: ["error"],
                warnings: ["warning"]
            };
        }
    }
});
