import morgan from 'morgan';

export default defineEventHandler(event => {
  var logger = morgan('tiny');
  logger(event.node.req, event.node.res, function () {});
});
