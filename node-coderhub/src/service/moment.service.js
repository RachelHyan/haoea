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
          JSON_OBJECT('id', u.id, 'account', u.account, 'avatarURL', u.avatar_url) author,
          (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
          (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
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
        SELECT -- 选择要展示的字段
          m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, -- 取别名
          JSON_OBJECT('id', u.id, 'account', u.account, 'avatarURL', u.avatar_url) author, -- 构建一个 JSON 对象
          (
            SELECT 
              JSON_ARRAYAGG(JSON_OBJECT( -- JSON_ARRAYAGG:聚合成 JSON 数组
                'id', c.id, 'content', c.content,'commentId',c.comment_id,'createTime',c.createAt,
                'user', JSON_OBJECT('id', cu.id, 'account',cu.account, 'avatarURL', u.avatar_url)
              ))
            FROM comment c
            LEFT JOIN user cu ON c.user_id = cu.id
            WHERE c.moment_id = m.id
          ) comments, -- 子查询,避免多个LEFT JSON造成数据重复
          (
            JSON_ARRAYAGG(JSON_OBJECT(
              'id', l.id, 'name', l.name
            ))
          ) labels
        FROM 
          moment m -- 从 moment 表中查询，并起别名 m
        LEFT JOIN user u ON m.user_id = u.id -- 通过 user_id 字段将 moment 表和 user 表进行连接，拿到 user 的数据，并起别名 u
        
        LEFT JOIN moment_label ml ON ml.moment_id = m.id
        LEFT JOIN label l ON ml.label_id = l.id
        
        WHERE m.id = ? -- 对 moment 的 id 进行筛选
        GROUP BY m.id; -- 按照 moment 的 id 进行分组
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

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;

    const [result] = await connection.execute(statement, [momentId, labelId]);

    return !!result.length;
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`

    const [result] = await connection.execute(statement, [momentId, labelId]);

    return result;
  }
}

module.exports = new MomentService();
