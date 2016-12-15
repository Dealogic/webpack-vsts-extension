var path = require('path');
var tl = require('vso-task-lib');

var echo = new tl.ToolRunner(tl.which('echo', true));

var currentWorkingDirectory = tl.getPathInput('currentWorkingDirectory', false);
var webpackConfigurationFilename = tl.getInput('webpackConfigurationFilename', true);

echo.arg(currentWorkingDirectory)
echo.arg(webpackConfigurationFilename);

// will error and fail task if it doesn't exist
tl.checkPath(currentWorkingDirectory, 'currentWorkingDirectory');
tl.cd(currentWorkingDirectory);

echo.exec({ failOnStdErr: false})
.then(function(code) {
    tl.exit(code);
})
.fail(function(err) {
    console.error(err.message);
    tl.debug('taskRunner fail');
    tl.exit(1);
})
