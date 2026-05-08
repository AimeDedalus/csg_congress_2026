const db = require('../config/db');

class Attendee {
  static async create(data) {
    // Añadimos is_present y check_in_time directo a la inserción
    const query = `INSERT INTO attendees (ticket, id_doc_type, id_doc, first_name, last_name, sex, church, address, email, phone, country, role, observations, is_present, check_in_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    return db.execute(query, [
      data.ticket, 
      data.docType, 
      data.idDoc, 
      data.firstName, 
      data.lastName, 
      data.sex || 'Masculino', 
      data.church || '', 
      data.address || '', 
      data.email, 
      data.phone || '', 
      data.country, 
      data.role, 
      data.observations || '',
      data.is_present ? true : false,  // Guarda el estado del JSON
      data.check_in_time || null       // Guarda la hora del JSON
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
    const isPresent = data.is_present === '1' || data.is_present === true;
    // Si lo marcan presente, usa la hora actual o mantiene la que tenía. Si lo desmarcan, la pone en NULL.
    const query = `UPDATE attendees SET id_doc_type=?, id_doc=?, first_name=?, last_name=?, sex=?, church=?, address=?, email=?, phone=?, country=?, role=?, observations=?, is_present=?, check_in_time=(CASE WHEN ? THEN COALESCE(check_in_time, CURRENT_TIMESTAMP) ELSE NULL END) WHERE ticket=?`;
    
    return db.execute(query, [
      data.docType, data.idDoc, data.firstName, data.lastName, 
      data.sex, data.church, data.address, data.email, data.phone, data.country, 
      data.role, data.observations, isPresent, isPresent, ticket
    ]);
  }

  static async delete(ticket) {
    return db.execute('DELETE FROM attendees WHERE ticket = ?', [ticket]);
  }

  static async checkIn(ticket) {
    return db.execute('UPDATE attendees SET is_present = TRUE, check_in_time = CURRENT_TIMESTAMP WHERE ticket = ?', [ticket]);
  }
}

module.exports = Attendee;
