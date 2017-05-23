import { IWebpackBuildResult } from "./IWebpackBuildResult";

export default function compile(
    webpackModuleLocation: string,
    webpackConfigLocation: string,
    done: (error: any, result: IWebpackBuildResult) => void): void {

    console.log("compilation of the webpack project is started");

    const webpack = require(webpackModuleLocation);
    const options = require(webpackConfigLocation);

    const compiler = new webpack(options);

    compiler.run((error: any, result: IWebpackBuildResult) => {
        console.log("compilation of the webpack project is done");

        if (done) {
            if (error) {
                throw error;
            }

            done(error, result);
        }
    });
}
