import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationResult: {
        hash: "",
        assets: [],
        children: [],
        chunks: [],
        time: 1,
        version: "",
        errors: ["error"],
        warnings: ["warning"]
    },
    jsonToStringResult: "shouldFailIfThereAreErrorsAndWarningsResult"
});
