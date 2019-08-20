#!/usr/bin/env node

const commander = require('commander'),
    program = new commander.Command(),
    package = require('./package.json'),
    { generateRaveFile } = require('./core/rave-cli');

// Describe tool
program
    .version(package.version)
    .description('Rave CLI tool for integrating payment powered  by Flutterwave without hassle');

//execute command for rave inline initialization
program
    .command('init <scriptType> [mini]')
    .alias('i')
    .description('Create a rave inline script')
    .action((scriptType, mini) => {
        generateRaveFile(scriptType, 'rave-inline', mini)
    });

program.parse(process.argv);