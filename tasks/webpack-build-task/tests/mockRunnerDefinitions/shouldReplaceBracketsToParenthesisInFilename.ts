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
            return "shouldReplaceBracketsToParenthesisInFilename";
        }
    },
    taskDisplayName: "webpack [something in brackets]",
    mockWriteFile: true
});
