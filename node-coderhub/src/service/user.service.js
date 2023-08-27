const connection = require("../app/database");

class UserService {
  async create(user) {
    // 1. 获取用户请求传递的参数
    const { account, password } = user;

    // 2. 拼接 statment
    const statement = "INSERT INTO `user` (account, password) VALUES (?, ?);";

    // 3. 执行 sql 语句
    const [result] = await connection.execute(statement, [account, password]);

    // 4. 返回结果
    return result;
  }

  async getUserByAccount(account) {
    // 1. 定义 sql 语句
    const statement = "SELECT * FROM `user` WHERE account = ?;";

    // 2. 执行 sql 语句
    const [VALUES] = await connection.execute(statement, [account]);

    // 3. 返回结果
    return VALUES;
  }

  async updateUserAvatar(avatar, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;

    const [result] = await connection.execute(statement, [avatar, userId]);

    return result;
  }
}

module.exports = new UserService();
