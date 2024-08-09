/**
 * @description define the route
 * @author Cynthiazqy
 */

import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;

  router.get('/api/getPageInfo', controller.pageInfo.getPageInfo);
};
