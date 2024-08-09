/**
 * @description define the controller to deal the quest and return response
 * @author Cynthiazqy
 */

import { Controller } from 'egg';

interface PageInfoProps {
  id?: number | null;
  title: string | null;
  score: string | null;
  viewsNum: string | null;
  para: string | null;
  subPara1: string | null;
  subPara2: string | null;
}

export default class UserController extends Controller {
  async getPageInfo() {
    const { ctx } = this;
    const pageInfo: PageInfoProps = await ctx.service.pageInfo.getPageInfo();
    ctx.body = pageInfo;
  }
}
