import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationResult: {
        toJson: () => {
            return {
                errors: [],
                warnings: ["warning"]
            };
        }
    }
});
