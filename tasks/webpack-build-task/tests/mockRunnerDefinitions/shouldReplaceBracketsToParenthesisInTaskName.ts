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
            return "shouldReplaceBracketsToParenthesisInTaskName";
        }
    },
    taskDisplayName: "webpack [something in brackets]",
    mockWriteFile: true
});
