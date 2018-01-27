import runTestTask from "./shared/testTaskRunner";

runTestTask({
    webpackCompilationError: new Error("error happened during compilation of the webpack project"),
    webpackCompilationResult: {
        hash: "",
        time: 1,
        version: "",
        assets: [],
        children: [],
        chunks: [],
        errors: ["error"],
        warnings: []
    },
    jsonToStringResult: "shouldReportErrorDetailInCaseOfWebpackBuildFailure",
    treatErrorsAs: "info",
    treatWarningsAs: "info"
});
