const { configureExpress } = require('./middlewares')
const debug = require('debug')

const startApp = (id) => {
  const emufcDebug = debug(`emufc-api:server:${id}:`);
  
  var app = configureExpress();
  app.listen(app.get('port'), () => {
    emufcDebug(`Listening on port ${app.get('port')}`);
  });
}

module.exports = {
  startApp
}