import * as path from "path";
import { Configuration } from "webpack";

const configuration: Configuration = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "tslint-loader",
                exclude: /node_modules/,
                enforce: "pre"
            },
            {
                test: /\.tsx?$/,
                use: "awesome-typescript-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};

export default configuration;
