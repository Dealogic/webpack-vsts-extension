import { IWebpackCompilationResult } from "./IWebpackCompilationResult";

export default function compile(
    webpack: new(config: any) => any,
    webpackConfig: any,
    done: (error: any, result: IWebpackCompilationResult) => void): void {

    console.log("compilation of the webpack project is started");

    const compiler = new webpack(webpackConfig);

    compiler.run((error: any, result: IWebpackCompilationResult) => {
        console.log("compilation of the webpack project is done");

        if (done) {
            if (error) {
                throw error;
            }

            done(error, result);
        }
    });
}
