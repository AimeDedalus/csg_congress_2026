const Attendee = require('../models/Attendee');
const User = require('../models/User');
const Log = require('../models/Log'); 
const db = require('../config/db');

exports.getWelcome = (req, res) => res.render('welcome', { title: 'Inicio' });

// --- RUTAS DE AUTENTICACIÓN ---
exports.getLogin = (req, res) => {
  res.render('login', { title: 'Iniciar Sesión', error: null });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (user && user.password === password) {
      req.session.user = { id: user.id, username: user.username, role: user.role };
      
      if (typeof Log !== 'undefined' && Log.create) {
         await Log.create(user.username, 'INICIO_SESION', `El usuario ${user.username} ingresó al sistema.`);
      }

      if (user.role === 'admin' || user.role === 'superadmin') {
        res.redirect('/dashboard');
      } else {
        res.redirect('/consult');
      }
    } else {
      res.render('login', { title: 'Iniciar Sesión', error: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    console.error(err);
    res.render('login', { title: 'Iniciar Sesión', error: 'Error del servidor al intentar acceder' });
  }
};

exports.getLogout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// --- GESTIÓN DE USUARIOS Y RESPALDO (SUPERADMIN) ---
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('users', { title: 'Gestión de Usuarios', users, success: null, error: null });
  } catch (err) {
    res.status(500).send("Error de base de datos: " + err.message);
  }
};

exports.postCreateUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    await User.create(username, password, role);
    if (typeof Log !== 'undefined' && Log.create) {
        await Log.create(req.session.user.username, 'CREAR_USUARIO', `Creó un nuevo usuario: ${username} con rol ${role}.`);
    }
    const users = await User.findAll();
    res.render('users', { title: 'Gestión de Usuarios', users, success: 'Usuario creado correctamente.', error: null });
  } catch (err) {
    const users = await User.findAll();
    res.render('users', { title: 'Gestión de Usuarios', users, success: null, error: 'Error: El nombre de usuario ya existe.' });
  }
};

exports.postUpdateUser = async (req, res) => {
  const { id, username, password, role } = req.body;
  try {
    // Evitar que el superadmin se quite sus propios permisos por error
    if (id == req.session.user.id && role !== 'superadmin') {
      const users = await User.findAll();
      return res.render('users', { title: 'Gestión de Usuarios', users, success: null, error: 'No puedes quitarte el rol de superadmin a ti mismo.' });
    }
    
    await User.update(id, username, password, role);
    
    // Actualizar la sesión si el usuario se edita a sí mismo
    if (id == req.session.user.id) {
        req.session.user.username = username;
        req.session.user.role = role;
    }

    let detalleLog = `Actualizó el usuario ID #${id} (Nuevo Nombre: ${username}, Rol: ${role}).`;
    if (password && password.trim() !== '') {
        detalleLog += " Se cambió la contraseña.";
    }

    if (typeof Log !== 'undefined' && Log.create) {
        await Log.create(req.session.user.username, 'EDITAR_USUARIO', detalleLog);
    }
    
    const users = await User.findAll();
    res.render('users', { title: 'Gestión de Usuarios', users, success: 'Usuario actualizado correctamente.', error: null });
  } catch (err) {
    console.error(err);
    const users = await User.findAll();
    res.render('users', { title: 'Gestión de Usuarios', users, success: null, error: 'Error: El nombre de usuario ya está en uso o hubo un fallo en la base de datos.' });
  }
};

exports.postDeleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    if (id == req.session.user.id) {
      const users = await User.findAll();
      return res.render('users', { title: 'Gestión de Usuarios', users, success: null, error: 'No puedes eliminar tu propia cuenta.' });
    }
    await User.delete(id);
    if (typeof Log !== 'undefined' && Log.create) {
        await Log.create(req.session.user.username, 'ELIMINAR_USUARIO', `Eliminó permanentemente al usuario ID #${id}.`);
    }
    const users = await User.findAll();
    res.render('users', { title: 'Gestión de Usuarios', users, success: 'Usuario eliminado del sistema.', error: null });
  } catch (err) {
    const users = await User.findAll();
    res.render('users', { title: 'Gestión de Usuarios', users, success: null, error: 'Error al eliminar el usuario.' });
  }
};

exports.getBackup = async (req, res) => {
  try {
    const attendees = await Attendee.findAll();
    const backupData = {
      timestamp: new Date().toISOString(),
      type: 'congress_backup',
      attendees: attendees
    };
    
    if (typeof Log !== 'undefined' && Log.create) {
        await Log.create(req.session.user.username, 'DESCARGAR_RESPALDO', `Descargó una copia de seguridad (JSON) de la base de datos.`);
    }

    res.setHeader('Content-disposition', 'attachment; filename=respaldo_asistentes.json');
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify(backupData, null, 2));
  } catch (err) {
    res.status(500).send("Error generando el respaldo: " + err.message);
  }
};

exports.postRestore = async (req, res) => {
  try {
    const { type, attendees } = req.body;
    
    if (type !== 'congress_backup' || !Array.isArray(attendees)) {
      return res.status(400).json({ success: false, error: 'Formato de archivo inválido. Sube un JSON de respaldo del congreso.' });
    }
    
    await db.execute('DELETE FROM attendees');
    
    for (const a of attendees) {
      // 1. Limpiamos y aseguramos el formato de la fecha para que MySQL lo entienda
      let parsedDate = null;
      if (a.check_in_time) {
          const d = new Date(a.check_in_time);
          if (!isNaN(d)) parsedDate = d;
      }

      await Attendee.create({
        ticket: a.ticket, 
        docType: a.id_doc_type || 'CC', 
        idDoc: a.id_doc, 
        firstName: a.first_name,
        lastName: a.last_name, 
        sex: a.sex || 'Masculino', 
        church: a.church || '', 
        address: a.address || '', 
        email: a.email, 
        phone: a.phone || '', 
        country: a.country, 
        role: a.role, 
        observations: a.observations || '',
        is_present: a.is_present,
        check_in_time: parsedDate // Pasamos la fecha ya procesada o nula
      });
    }
    
    if (typeof Log !== 'undefined' && Log.create) {
        await Log.create(req.session.user.username, 'RESTAURAR_RESPALDO', `Restauró la base de datos completa desde un archivo JSON.`);
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Error al restaurar BD:", err);
    // 2. AHORA ENVIAMOS EL MENSAJE REAL AL POPUP
    res.status(500).json({ success: false, error: 'Fallo de MySQL: ' + err.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    if (typeof Log !== 'undefined' && Log.findAll) {
        const logs = await Log.findAll();
        res.render('logs', { title: 'Registro de Actividad', logs });
    } else {
        res.send("El módulo de logs no está habilitado.");
    }
  } catch (err) {
    res.status(500).send("Error cargando los logs: " + err.message);
  }
};

// --- RUTAS DE LA APLICACIÓN ---
exports.getDashboard = async (req, res) => {
  try {
    const attendees = await Attendee.findAll();
    const presentAttendees = attendees.filter(a => a.is_present);

    const stats = {
      total: attendees.length,
      present: presentAttendees.length,
      absent: attendees.filter(a => !a.is_present).length,
      
      roles: attendees.reduce((acc, a) => { acc[a.role] = (acc[a.role] || 0) + 1; return acc; }, {}),
      countries: attendees.reduce((acc, a) => { acc[a.country] = (acc[a.country] || 0) + 1; return acc; }, {}),
      
      presentRoles: presentAttendees.reduce((acc, a) => { acc[a.role] = (acc[a.role] || 0) + 1; return acc; }, {}),
      presentCountries: presentAttendees.reduce((acc, a) => { acc[a.country] = (acc[a.country] || 0) + 1; return acc; }, {})
    };
    res.render('dashboard', { title: 'Panel de Control', stats });
  } catch (err) {
    res.status(500).send("Error de base de datos: " + err.message);
  }
};

exports.getReports = async (req, res) => {
  try {
    const filter = req.query.filter || 'all';
    const sortOrder = req.query.sort || 'asc';
    const attendees = await Attendee.findAll();
    
    if (sortOrder === 'asc') attendees.sort((a, b) => a.last_name.localeCompare(b.last_name));
    else if (sortOrder === 'desc') attendees.sort((a, b) => b.last_name.localeCompare(a.last_name));
    
    const pastors = attendees.filter(a => a.role === 'Pastor');
    const leaders = attendees.filter(a => a.role === 'Leader');
    const coordinators = attendees.filter(a => a.role === 'Cordinador');
    const volunteers = attendees.filter(a => a.role === 'Voluntario');
    const publicAttendees = attendees.filter(a => a.role === 'Public');

    const men = attendees.filter(a => a.sex === 'Masculino');
    const women = attendees.filter(a => a.sex === 'Femenino');

    const present = attendees.filter(a => a.is_present);
    const absent = attendees.filter(a => !a.is_present);

    const churchGroups = attendees.reduce((acc, a) => {
      const churchName = (a.church && a.church.trim() !== '') ? a.church.trim() : 'Sin Iglesia Registrada';
      if (!acc[churchName]) acc[churchName] = [];
      acc[churchName].push(a);
      return acc;
    }, {});

    res.render('reports', { 
      title: 'Reportes', 
      pastors, leaders, coordinators, volunteers, publicAttendees, 
      men, women, present, absent, churchGroups, 
      filter, sortOrder 
    });
  } catch (err) {
    res.status(500).send("Error cargando los reportes: " + err.message);
  }
};

exports.getRegister = async (req, res) => {
  let countries = [];
  let docTypes = [];
  try {
    const [countryRows] = await db.execute('SELECT name FROM countries ORDER BY name ASC');
    countries = countryRows;
    const [docTypeRows] = await db.execute('SELECT name FROM document_types ORDER BY id ASC');
    docTypes = docTypeRows;
  } catch (err) {}
  res.render('register', { title: 'Registro', success: null, error: null, countries, docTypes });
};

exports.postRegister = async (req, res) => {
  let countries = [];
  let docTypes = [];
  try {
    const [countryRows] = await db.execute('SELECT name FROM countries ORDER BY name ASC');
    countries = countryRows;
    const [docTypeRows] = await db.execute('SELECT name FROM document_types ORDER BY id ASC');
    docTypes = docTypeRows;
  } catch (err) {}

  try {
    await Attendee.create(req.body);
    if (typeof Log !== 'undefined' && Log.create) {
        await Log.create(req.session.user.username, 'NUEVO_REGISTRO', `Registró al asistente ${req.body.firstName} ${req.body.lastName} (Ticket: ${req.body.ticket}).`);
    }
    res.render('register', { title: 'Registro', success: '¡Asistente registrado exitosamente!', error: null, countries, docTypes });
  } catch (err) {
    res.render('register', { title: 'Registro', success: null, error: 'Error: El número de Ticket o Documento ya existe.', countries, docTypes });
  }
};

exports.getConsult = async (req, res) => {
  const query = req.query.q || '';
  const field = req.query.field || 'ticket';
  const sortOrder = req.query.sort || '';
  const editedTicket = req.query.edited || null;
  
  let attendees = await Attendee.findAll();
  
  if (query) {
    attendees = attendees.filter(a => String(a[field]).toLowerCase().includes(query.toLowerCase()));
  }

  if (sortOrder === 'asc') attendees.sort((a, b) => a.last_name.localeCompare(b.last_name));
  else if (sortOrder === 'desc') attendees.sort((a, b) => b.last_name.localeCompare(a.last_name));

  if (editedTicket && !query) {
    const editedIndex = attendees.findIndex(a => a.ticket === editedTicket);
    if (editedIndex > 0) {
      const [edited] = attendees.splice(editedIndex, 1);
      attendees.unshift(edited);
    }
  }

  res.render('consult', { title: 'Consultas y Check-In', attendees, query, field, sortOrder, editedTicket });
};

exports.postCheckIn = async (req, res) => {
  await Attendee.checkIn(req.body.ticket);
  if (typeof Log !== 'undefined' && Log.create) {
    await Log.create(req.session.user.username, 'CHECK_IN', `Marcó entrada exitosa para el Ticket: ${req.body.ticket}.`);
  }
  // Redirige enviando el ticket editado para resaltarlo visualmente y limpiar el buscador
  res.redirect('/consult?edited=' + encodeURIComponent(req.body.ticket));
};

exports.getModify = async (req, res) => {
  const ticket = req.query.ticket;
  let attendee = null;
  let countries = [];
  let docTypes = [];

  try {
    const [countryRows] = await db.execute('SELECT name FROM countries ORDER BY name ASC');
    countries = countryRows;
    const [docTypeRows] = await db.execute('SELECT name FROM document_types ORDER BY id ASC');
    docTypes = docTypeRows;
  } catch (err) {}

  if (ticket) attendee = await Attendee.findByTicket(ticket);
  res.render('modify', { title: 'Modificar Registro', attendee, success: null, countries, docTypes });
};

exports.postModify = async (req, res) => {
  let countries = [];
  let docTypes = [];
  try {
    const [countryRows] = await db.execute('SELECT name FROM countries ORDER BY name ASC');
    countries = countryRows;
    const [docTypeRows] = await db.execute('SELECT name FROM document_types ORDER BY id ASC');
    docTypes = docTypeRows;
  } catch (err) {}

  try {
    await Attendee.update(req.body.ticket, req.body);
    if (typeof Log !== 'undefined' && Log.create) {
        await Log.create(req.session.user.username, 'MODIFICACION', `Modificó los datos del asistente con Ticket: ${req.body.ticket}.`);
    }
    
    // Redirige de vuelta a la lista de consultas resaltando el modificado
    res.redirect('/consult?edited=' + encodeURIComponent(req.body.ticket));
  } catch (err) {
    const attendee = await Attendee.findByTicket(req.body.ticket);
    res.render('modify', { title: 'Modificar Registro', attendee, success: null, error: 'Error al actualizar el registro.', countries, docTypes });
  }
};

exports.getDelete = async (req, res) => {
  const ticket = req.query.ticket;
  let attendee = null;
  if (ticket) attendee = await Attendee.findByTicket(ticket);
  res.render('delete', { title: 'Eliminar Registro', attendee, success: null });
};

exports.postDelete = async (req, res) => {
  await Attendee.delete(req.body.ticket);
  if (typeof Log !== 'undefined' && Log.create) {
    await Log.create(req.session.user.username, 'ELIMINACION', `Eliminó permanentemente el Ticket: ${req.body.ticket}.`);
  }
  
  // Si la petición viene desde la ventana flotante (Consultas), lo redirigimos allí.
  if (req.body.redirect) {
    res.redirect(req.body.redirect);
  } else {
    // Comportamiento original por si usan la ruta antigua
    res.render('delete', { title: 'Eliminar Registro', attendee: null, success: 'Registro eliminado permanentemente.' });
  }
};
