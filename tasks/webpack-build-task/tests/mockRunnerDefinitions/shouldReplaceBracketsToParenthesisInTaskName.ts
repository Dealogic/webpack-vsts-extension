import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationResult: {
        hash: "",
        time: 1,
        version: "",
        assets: [],
        children: [],
        chunks: [],
        errors: [],
        warnings: []
    },
    jsonToStringResult: "shouldReplaceBracketsToParenthesisInTaskName",
    taskDisplayName: "webpack [something in brackets]",
    mockWriteFile: true
});
