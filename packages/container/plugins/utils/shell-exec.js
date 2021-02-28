const shell = require('shelljs');

module.exports = (command) => {
    shell.echo(`======== Executing: ${command} ========`);
    if (shell.exec(command).code !== 0) {
        shell.echo(`Error: '${command}' failed`);
        shell.exit(1);
    }
};
