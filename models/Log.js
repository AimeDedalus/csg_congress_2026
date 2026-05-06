const db = require('../config/db');

class Log {
  static async create(username, action, details) {
    const query = `INSERT INTO activity_logs (username, action, details) VALUES (?, ?, ?)`;
    return db.execute(query, [username, action, details]);
  }

  static async findAll() {
    // Obtenemos los últimos 500 registros para no sobrecargar la vista
    const [rows] = await db.execute('SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 500');
    return rows;
  }
}

module.exports = Log;
