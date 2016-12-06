'use strict';

module.exports (<%= moduleName %>) => {
  require('./methods')(<%= moduleName %>);
  require('./controllers')(<%= moduleName %>);
  require('./hooks')(<%= moduleName %>);
};