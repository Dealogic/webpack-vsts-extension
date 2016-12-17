# Webpack Task for Visual Studio Team System (VSTS)

There is no official webpack task for the Visual Studio Team System builds, so this project is trying to fill
this gap. Clone this git repository and upload the task to your Team System project with
[tfx-cli](https://github.com/Microsoft/tfs-cli) tool.

You can read more about creation of custom tasks [here](http://blog.devmatter.com/custom-build-tasks-in-vso/).

## Features
* Reports webpack build warnings and errors under the Issues / Build section on the Summary page.
* The warnings are handled as partially succeeded builds.
* The errors are handled as failed builds.

![alt text](https://raw.githubusercontent.com/wiki/jkanczler/webpack-vsts/BuildSummary.png "Webpack Build Summary")

## Future Plan
* Provide an option to handle warnings as errors.
* Webpack custom section on the Summary page to show more information even for successful builds.

## How to use it

### 1. Install [tfx-cli](https://github.com/Microsoft/tfs-cli)

First of all you have to install the [tfx-cli](https://github.com/Microsoft/tfs-cli) command line tool by
Microsoft from npm:

```
npm i tfx-cli -g
```

### 2. Create or get a personal access token for your Visual Studio online account

You have to create or use your personal access token to provide access to
[tfx-cli](https://github.com/Microsoft/tfs-cli) for your Visual Studio online account.
You can find a guide [here](https://roadtoalm.com/2015/07/22/using-personal-access-tokens-to-access-visual-studio-online/)
how to do this.

### 3. Login with [tfx-cli](https://github.com/Microsoft/tfs-cli)

If you have your personal access token, you can use the following command to login:

```
tfx login
```

You have to provide your service URL (must ends with DefaultCollection, for example
https://my-account.visualstudio.com/DefaultCollection) and the token.

### 4. Clone this repository

Clone webpack-vsts repository to your local machine and navigate into the cloned folder.

```
git clone https://github.com/jkanczler/webpack-vsts.git
cd webpack-vsts
```

### 5. Run the upload npm script

There is an npm script already to upload the task.

```
npm run upload
```

### 6. Add webpack task as a build step your VSTS build

Now you can add the webpack task to your VSTS build as a new build step.

![alt text](https://raw.githubusercontent.com/wiki/jkanczler/webpack-vsts/WebpackBuildTask.png "Webpack Build Task in Task Catalog")

### 7. Configure the task

Setting          | Description
--- | ---
working folder | The path of the working folder where webpack build will run. Optional, if the path is not provided, then the root folder will be used.
arguments | As the task is using the webpack-cli you can provide your arguments. For example you can pass `--config my.webpack.config.js` if you have custom configuration file.
