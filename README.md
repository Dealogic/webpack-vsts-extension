# Webpack build task for Visual Studio Team Services

[Webpack](https://webpack.github.io/) build task for [Visual Studio Team Services](https://www.visualstudio.com/fr-fr/products/visual-studio-team-services-vs.aspx).

## Installation

Installation can be done using [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension).

## Source Code

Source code can be found on [GitHub](https://github.com/Dealogic/webpack-vsts-extension).

## Usage

Add the task to your build configuration:

![Add webpack task](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/TaskCatalog.png)

By default without any configuration the build task is trying to run the locally installed webpack.js from the root folder in the repository with the `--json` flag.
For example:
```
node "C:\a\1\s\node_modules\webpack\bin\webpack.js" --json"
```

Through the arguments setting additional webpack arguments can be provided. For example:
```
--config webpack.dist.config.js
```

### Advanced Settings

Working folder optional:

Screenshot has to be added here!

webpack.js location by default is the locally installed webpack node module package, but optional path can be provided:

Screenshot has to be added here!

![Webpack arguments](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/screenshots/WebpackArguments.png)

## License

[MIT](https://github.com/Dealogic/webpack-vsts-extension/blob/master/LICENSE)
