# webpack build task

### A build task for [Visual Studio Team Services (VSTS)](https://www.visualstudio.com/fr-fr/products/visual-studio-team-services-vs.aspx) made with ♥ by

[![dealogic logo](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/dealogic-logo.png)](http://www.dealogic.com)

### to bundle your assets, scripts, images and styles with webpack.

![build status](https://dealogic.visualstudio.com/DefaultCollection/_apis/public/build/definitions/4cd19643-db3a-4dcc-b481-76a7800dd64d/7871/badge)

## Content

* [Installation](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#installation)
* [Source Code](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#source-code)
* [What The Build Step Does](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#what-the-build-step-does)
* [Usage](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#usage)
    * [Advanced Settings](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#advanced-settings)
    * [Multiple Build Steps](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#multiple-build-steps)
* [Summary of Task Settings](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#summary-of-task-settings)
* [Release Notes](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#release-notes)
* [License](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#license)

## <a id="installation"></a>Installation

Installation can be done using [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension).

## <a id="source-code"></a>Source Code

Source code can be found on [GitHub](https://github.com/Dealogic/webpack-vsts-extension).

## <a id="what-the-build-step-does"></a>What The Build Step Does

This build step is using the webpack's command line tool to compile a 'web' application into a bundle. The result, warnings and errors are reported onto the build summary section.

## <a id="usage"></a>Usage

Add the task to your build configuration:

![Add webpack task](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/TaskCatalog.png)

By default without any configuration the build task is trying to run the locally installed webpack.js from the root folder in the repository and trying to pick up the `webpack.config.js`.

Through the `webpack cli arguments` setting custom arguments can be passed to the webpack cli:

```
-p --display normal
```

Errors and Warnings can be treated differently:
* treat errors as (errors / warnings / info)
* treat warnings as (errors / warnings / info)

Warnings means the task will partially succeed, in case of errors the task will fail. If there are no errors and no warnings, then the task will succeed. You can treat the errors as warnings, so in case of errors, the task will just partially succeed. Or if you would like to ignore the warnings, those should be handled as info.

Errors and Warnings can be reported as pull request comments. Currently only two loaders are supported:
* ts-loader
* tslint-loader

Even general webpack errors and warnings are not supported yet. More support will come!

Don't forget to turn on the following agent phase setting:
![Prerequisite for pull request commenting](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/PullRequestCommentingPrerequisite.png)

![webpack arguments](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/WebpackArguments.png)

The webpack build errors and warnings are reported under the issues / build section on the summary page:

![webpack build issues](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/WebpackBuildIssues.png)

The webpack build result section is added onto the summary page to summarize the result:

![webpack build result](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/WebpackBuildResult.png)

### <a id="advanced-settings"></a>Advanced Settings

- Working folder where webpack command is run. If you leave it blank it is the root of the repo.
- Location of the webpack cli. By default it is the locally installed webpack node module in the working folder, e.g. `./node_modules/webpack/bin/webpack.js`.
- Location of the Stats.js. By default it is the locally installed webpack node module in the working folder, e.g. `./node_modules/webpack/lib/Stats.js`.

![Advanced settings](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/AdvancedSettings.png)

### <a id="multiple-build-steps"></a>Multiple Build Steps

Multiple webpack build steps are supported now. To distinguish the webpack build steps on the summary page
and in the list of issues, set the display name properly for the steps:

![Multiple setps with different name](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/MultipleStepsWithDifferentName.png)

If the webpack projects are not even in the root folder, then don't forget to modify it in the advanced settings like this:

![Different working folder](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/ModifiedWorkingFolder.png)

The issues in case of multiple build steps:

![Issues section for multiple steps](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/IssuesForMultipleSteps.png)

The result sections in case of multiple build steps:

![Result sections for multiple steps](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/ResultSectionsForMultipleSteps.png)

## <a id="summary-of-task-settings"></a>Summary of Task Settings

Name | Required | Default Value | Description
--- | :---: | --- | ---
webpack cli arguments | false | | Arguments to pass to the webpack cli.
treat errors as | true | errors | How to treat errors. Options are: errors (breaks build) / warnings (marks build as partially succeeded) / info (reports errors as info).
treat warnings as | true | warnings | How to treat warnings. Options are: errors (breaks build) / warnings (marks build partially succeeded) / info (reports warnings as info).
enable pull request comments | false | false | Enable errors and warnings be reported as pull request comments. Supported loaders: ts-loader, tslint-loader.
workingFolder | false | | Working folder where webpack compilation is run. If you leave it blank it is the root of the repository.
webpack cli location | true | ./node_modules/webpack/bin/webpack.js | Location of the webpack cli. By default it's the locally installed webpack cli.
stats.js Location | true | ./node_modules/webpack/lib/Stats.js | Location of the Stats.js. By default it's the Stats.js from the locally installed webpack.

## <a id="release-notes"></a>Release Notes

* 4.1.2 (23/08/2018)
    * Errors and warnings can be reported as pull request comments (ts-loader and tslint-loader are supported, more will come).
* 4.0.4 (24/05/2018)
    * Dependencies are updated to fix security vulnerabilities (though it was just in one of the samples).
* 4.0.3 (29/03/2018)
    * The `--display "none"` flag is working properly with webpack 4.
* 4.0.2 (27/01/2018)
    * Documentation is updated.
* 4.0.1 (27/01/2018)
    * Errors and Warnings are reported correctly in the webpack like logs based on the --display none/errors-only/minimal/normal/detailed/verbose option.
* 4.0.0 (27/01/2018)
    * Using webpack-cli again instead of node.js API.
* 3.2.2 (03/10/2017)
    * Avoid webpack task summary section overflow with adding scrollbar.
    * Webpack task summary section uses same font as other sections.
* 3.2.1 (22/09/2017)
    * Replacing `[]` brackets to `()` parenthesis in the title of the result summary section.
* 3.2.0 (22/09/2017)
    * Support `[]` brackets in the display name of the task.
* 3.1.0 (21/09/2017)
    * Support for TypeScript webpack configuration is added.
    * The ts-node module location can be modified.
    * The ts-node module options file location can be supplied.
* 3.0.19 (03/07/2017)
    * As the build step is using webpack's node.js API the arguments setting is gone. Instead of that there's the webpack config file location where custom configuration files can be specified for the compilation.
    * The setting of webpack.js location is gone, instead of that use webpack module location if you don't want to use the locally installed webpack module.
    * The webpack build step summary section is using webpack node.js API to show the result information.
    * The webpack build step now is logging the summary section onto the log section as well.

* 2.1.3 (22/05/2017)
* 2.1.2 (22/05/2017)
* 2.1.0 (22/05/2017)
* 2.0.2 (16/05/2017)
* 1.1.1 (29/03/2017)
* 1.1.0 (21/01/2017)

## <a id="license"></a>License

[MIT](https://github.com/Dealogic/webpack-vsts-extension/blob/master/LICENSE)
