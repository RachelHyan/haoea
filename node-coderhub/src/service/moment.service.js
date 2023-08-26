const connection = require("../app/database");

class MomentService {
  async create(content, userId) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?);";

    const [result] = await connection.execute(statement, [content, userId]);

    return result;
  }

  async queryList(offset = 0, size = 10) {
    /**
     * SELECT 子句：指定了要查询的列
     * m.createAt createTime: 将 createAt 列别名为 createTime
     * JSON_OBJECT('id', u.id, 'account', u.account) author：通过 JSON_OBJECT 函数，创建一个 JSON 对象，包含 id 和 account 两个字段，将其别名为 author
     *
     * FROM 子句：指定了要查询的表
     * moment m：表示要查询 moment 表，并使用别名 m
     * LEFT JOIN user u ON m.user_id = u.id：指定了 moment 表和 user 表之间的联接条件，通过 user_id 列与 id 列进行联接。
     */
    const statement = `
        SELECT
          m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'account', u.account) author
        FROM 
        moment m
        LEFT JOIN user u ON m.user_id = u.id
        LIMIT ? OFFSET ?;
      `;

    const [result] = await connection.execute(statement, [
      String(size),
      String(offset),
    ]);

    return result;
  }

  async getMomentById(id) {
    const statement = `
        SELECT
          m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'account', u.account) author
        FROM 
        moment m
        LEFT JOIN user u ON m.user_id = u.id
        WHERE m.id = ?;
      `;

    const [result] = await connection.execute(statement, [id]);

    return result;
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;

    const [result] = await connection.execute(statement, [content, momentId]);

    return result;
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;

    const [result] = await connection.execute(statement, [momentId]);

    return result;
  }
}

module.exports = new MomentService();
