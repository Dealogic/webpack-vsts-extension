import { IWebpackCompilationResult } from "../../webpackCompiler";
import runTestTask from "./shared/testTaskRunner";

const childForFirstChild: IWebpackCompilationResult = {
    hash: "hash",
    version: "1.0.0",
    time: 1,
    errors: ["child-for-first-child-error"],
    warnings: ["child-for-first-child-warning"],
    assets: [],
    chunks: [
        {
            modules: [
                {
                }
            ]
        }
    ]
};

const firstChild: IWebpackCompilationResult = {
    hash: "hash",
    version: "1.0.0",
    time: 1,
    errors: ["first-child-error"],
    warnings: ["first-child-warning"],
    assets: [],
    chunks: [
        {
            modules: [
                {
                }
            ]
        }
    ],
    children: [
        childForFirstChild
    ]
};

const secondChild: IWebpackCompilationResult = {
    hash: "hash",
    version: "1.0.0",
    time: 1,
    errors: ["second-child-error"],
    warnings: ["second-child-warning"],
    assets: [],
    chunks: [
        {
            modules: [
                {
                }
            ]
        }
    ]
};

const result: IWebpackCompilationResult = {
    hash: "hash",
    version: "1.0.0",
    time: 1,
    errors: ["root-error"],
    warnings: ["root-warning"],
    assets: [],
    chunks: [
        {
            modules: [
                {
                }
            ]
        }
    ],
    children: [
        firstChild,
        secondChild
    ]
};

runTestTask({
    webpackCompilationResult: result
});
