const connection = require("../app/database");

class PermissionService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;

    const [result] = await connection.execute(statement, [id, userId]);

    return !!result.length;
  }
}

module.exports = new PermissionService();
