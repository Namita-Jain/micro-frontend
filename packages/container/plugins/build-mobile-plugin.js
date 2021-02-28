const shell = require('shelljs');

const shellExec = require('./utils/shell-exec');

module.exports = class BuildMobilePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        const build = () => {

            const { platform, release } = this.options;


            shell.set('+v');

            shell.cp(`common/config.xml`, `cordova`);

            shell.cp(`common/package.json`, `cordova`);
            shell.cp(`common/package-lock.json`, `cordova`);


            // Cordova won't recognize this as cordova project unless we do this
            // https://github.com/ionic-team/ionic-cli/issues/935#issuecomment-236573448
            shell.mkdir('cordova/www');

            shell.pushd('cordova');

            console.log("====== REMOVING SOURCE MAP BEFORE APP PACKAGING ========");
            shell.rm('-rf', 'www/**.js.map');
            console.log("Done\n\n");

            shellExec(`cordova prepare ${platform}`);

            shellExec(`cordova build ${release ? '--release' : ''}`);

        };

        const cleanDirs = () => {
            console.log("====== REMOVING CORDOVA PLATFORMS, PLUGINS and WWW BUILD DIRECTORY ========");
            shell.rm('-rf', 'cordova/platforms', 'cordova/plugins', 'cordova/www');
            shell.rm('-f', 'cordova/strip-invalid-framework-architectures.sh', 'cordova/package.json', 'cordova/package-lock.json', 'cordova/extend_build_phase.js');
            console.log("Done\n\n")
        };

        compiler.hooks.beforeRun.tap('beforeRun', () => cleanDirs());
        compiler.hooks.done.tap('done', () => build());
    }
};
