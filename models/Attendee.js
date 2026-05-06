const db = require('../config/db');

class Attendee {
  static async create(data) {
    const query = `INSERT INTO attendees (ticket, id_doc_type, id_doc, first_name, last_name, sex, church, address, email, phone, country, role, observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return db.execute(query, [
      data.ticket, data.docType, data.idDoc, data.firstName, data.lastName, 
      data.sex, data.church, data.address, data.email, data.phone, data.country, 
      data.role, data.observations
    ]);
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM attendees ORDER BY created_at DESC');
    return rows;
  }

  static async findByTicket(ticket) {
    const [rows] = await db.execute('SELECT * FROM attendees WHERE ticket = ?', [ticket]);
    return rows[0];
  }

  static async update(ticket, data) {
    const query = `UPDATE attendees SET id_doc_type=?, id_doc=?, first_name=?, last_name=?, sex=?, church=?, address=?, email=?, phone=?, country=?, role=?, observations=?, is_present=? WHERE ticket=?`;
    return db.execute(query, [
      data.docType, data.idDoc, data.firstName, data.lastName, 
      data.sex, data.church, data.address, data.email, data.phone, data.country, 
      data.role, data.observations, data.is_present === '1', ticket
    ]);
  }

  static async delete(ticket) {
    return db.execute('DELETE FROM attendees WHERE ticket = ?', [ticket]);
  }

  static async checkIn(ticket) {
    return db.execute('UPDATE attendees SET is_present = TRUE WHERE ticket = ?', [ticket]);
  }
}

module.exports = Attendee;
