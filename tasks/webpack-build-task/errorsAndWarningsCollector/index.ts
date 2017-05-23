import { IWebpackCompilationResult } from "../webpackCompiler";

const collectErrors = (result: IWebpackCompilationResult) => {
    if (!result) {
        return;
    }

    let errors: string[] = [];

    if (result.errors) {
        errors = errors.concat(result.errors);
    }

    if (result.children) {
        for (const child of result.children) {
            errors = errors.concat(collectErrors(child));
        }
    }

    return errors;
};

const collectWarnings = (result: IWebpackCompilationResult) => {
    if (!result) {
        return;
    }

    let warnings: string[] = [];

    if (result.warnings) {
        warnings = warnings.concat(result.warnings);
    }

    if (result.children) {
        for (const child of result.children) {
            warnings = warnings.concat(collectWarnings(child));
        }
    }

    return warnings;
};

export {
    collectErrors,
    collectWarnings
};
