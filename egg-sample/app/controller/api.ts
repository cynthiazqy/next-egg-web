import { Controller } from 'egg';

export default class APIController extends Controller {
  public async getData() {
    const { ctx } = this;
    const data = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];
    ctx.boby = data;
  }
}
