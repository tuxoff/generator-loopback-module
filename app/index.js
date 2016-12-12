'use strict';

const generators = require('yeoman-generator');
const chalk = require('chalk');
const os = require('os');
const fs = require('fs');
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
    fs.readdir(`${__dirname}/templates/`, (err, files) => {
      files.forEach(file => {
        this.fs.copyTpl(
          this.templatePath(`${file}`),
          this.destinationPath(`${path}/${file}`),
          {moduleName}
        );
      });
    });
  },
  end: function () {
    this.log(chalk.red(`To finish your module generation please create/edit ${applicationPart}/${moduleName}.js:`));
    this.log(chalk.cyan(`module.exports = (${moduleName}) => { ${os.EOL}  require('./${moduleName}/')(${moduleName}); ${os.EOL}}; `));
    this.log(chalk.red(`And please add model to your model-config.json`));
  },
});