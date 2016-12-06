'use strict';

const generators = require('yeoman-generator');
const chalk = require('chalk');
const os = require('os');
let moduleName, applicationPart;

module.exports = generators.Base.extend({
  prompting: function () {
    return this.prompt([{
      type: 'input',
      name: 'moduleName',
      message: 'Your module name',
      store: true
    }, {
      type: 'list',
      name: 'modulePath',
      message: 'Do you want server or common module',
      choices: ['server', 'common']
    }]).then(function (answers) {
      moduleName = answers.moduleName;
      applicationPart = answers.modulePath;
    }.bind(this));
  },
  writing: function () {
    let path = applicationPart + '/models/' + moduleName;
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(path + '/index.js'),
      {moduleName}
    );
    this.fs.copyTpl(
      this.templatePath('controllers.js'),
      this.destinationPath(path + '/controllers.js'),
      {moduleName}
    );
    this.fs.copyTpl(
      this.templatePath('methods.js'),
      this.destinationPath(path + '/methods.js'),
      {moduleName}
    );
    this.fs.copyTpl(
      this.templatePath('hooks.js'),
      this.destinationPath(path + '/hooks.js'),
      {moduleName}
    );
  },
  end: function () {
    this.log(chalk.red(`To finish your module generation please create/edit ${applicationPart}/${moduleName}.js:`));
    this.log(chalk.cyan(`module.exports = (${moduleName}) => { ${os.EOL}  require('./${moduleName}/')(${moduleName}); ${os.EOL}}; `));
  },
});