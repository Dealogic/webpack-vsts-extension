# Webpack build task for Visual Studio Team Services

[Webpack](https://webpack.github.io/) build task for [Visual Studio Team Services](https://www.visualstudio.com/fr-fr/products/visual-studio-team-services-vs.aspx).

## Installation

Installation can be done using [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension).

## Source Code

Source code can be found on [GitHub](https://github.com/Dealogic/webpack-vsts-extension).

## Usage

Add the task to your build configuration:

![Add webpack task](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/TaskCatalog.png)

By default without any configuration the build task is trying to run the locally installed webpack.js from the root folder in the repository with the `--json` flag. For example:
```
node "C:\a\1\s\node_modules\webpack\bin\webpack.js" --json"
```

Through the arguments setting additional webpack arguments can be provided. For example:
```
--config webpack.dist.config.js
```

![Webpack arguments](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/WebpackArguments.png)

The webpack build errors and warnings are reported under the issues / build section on the summary page:

![Webpack build issues](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/WebpackBuildIssues.png)

The webpack build result section is added onto the summary page to summarize the result:

![Webpack build result](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/WebpackBuildResult.png)

Currently only one webpack build task is supported per builds for now!

### Advanced Settings

- Working folder where webpack command is run. If you leave it blank it is the root of the repo.
- Location of the webpack.js. By default it is the locally installed webpack node module package.

![Advanced settings](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/AdvancedSettings.png)

## License

[MIT](https://github.com/Dealogic/webpack-vsts-extension/blob/master/LICENSE)
