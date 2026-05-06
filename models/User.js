const db = require('../config/db');

class User {
  static async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT id, username, role FROM users ORDER BY id ASC');
    return rows;
  }

  static async create(username, password, role) {
    return db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
  }

  static async update(id, username, password, role) {
    if (password && password.trim() !== '') {
      return db.execute('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?', [username, password, role, id]);
    } else {
      return db.execute('UPDATE users SET username = ?, role = ? WHERE id = ?', [username, role, id]);
    }
  }

  static async delete(id) {
    return db.execute('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = User;
