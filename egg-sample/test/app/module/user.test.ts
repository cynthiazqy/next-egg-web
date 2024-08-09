import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

interface User {
  id: number;
  name: string;
  age: number;
}

describe('GET /api/users', () => {
  it('should return user list', async () => {
    // 模拟请求和响应
    // @ts-ignore
    const ctx = app.mockContext<{
      service: { user: { list: () => Promise<User[]> } };
    }>({
      service: {
        user: {
          async list() {
            return [
              { id: 1, name: 'Alice', age: 20 },
              { id: 2, name: 'Bob', age: 30 },
            ];
          },
        },
      },
    });
    const users = await ctx.service.user.list();
    assert.deepStrictEqual(users, [
      { id: 1, name: 'Alice', age: 20 },
      { id: 2, name: 'Bob', age: 30 },
    ]);
  });
});
