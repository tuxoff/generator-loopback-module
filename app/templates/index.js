'use strict';

module.exports (<%= moduleName %>) => {
  require('./controllers')(<%= moduleName %>);
  require('./hooks')(<%= moduleName %>);
  require('./methods')(<%= moduleName %>);
};