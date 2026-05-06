const express = require('express');
const router = express.Router();
const controller = require('../controllers/attendeeController');

// 🛡️ Guardián 1: Exige que el usuario haya iniciado sesión
const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) return next();
  res.redirect('/login');
};

// 🛡️ Guardián 2: Exige rol 'admin' O 'superadmin'
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'superadmin')) {
    return next();
  }
  if (req.session && req.session.user) return res.redirect('/consult');
  res.redirect('/login');
};

// 🛡️ Guardián 3: EXCLUSIVO para 'superadmin'
const requireSuperAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'superadmin') {
    return next();
  }
  res.redirect('/dashboard'); 
};

// --- Rutas Públicas ---
router.get('/', controller.getWelcome);
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);
router.get('/logout', controller.getLogout);

// --- Rutas de Gestión de Usuarios y Respaldos (SOLO SUPERADMIN) ---
router.get('/users', requireSuperAdmin, controller.getUsers);
router.post('/users/create', requireSuperAdmin, controller.postCreateUser);
router.post('/users/update', requireSuperAdmin, controller.postUpdateUser); // <-- AQUÍ ESTABA EL ERROR
router.post('/users/delete', requireSuperAdmin, controller.postDeleteUser);
router.get('/users/backup', requireSuperAdmin, controller.getBackup);
router.post('/users/restore', requireSuperAdmin, controller.postRestore);
router.get('/logs', requireSuperAdmin, controller.getLogs);

// --- Rutas Restringidas (Admin y Superadmin) ---
router.get('/dashboard', requireAdmin, controller.getDashboard);
router.get('/reports', requireAdmin, controller.getReports);
router.get('/register', requireAdmin, controller.getRegister);
router.post('/register', requireAdmin, controller.postRegister);
router.get('/modify', requireAdmin, controller.getModify);
router.post('/modify', requireAdmin, controller.postModify);
router.get('/delete', requireAdmin, controller.getDelete);
router.post('/delete', requireAdmin, controller.postDelete);

// --- Rutas Generales (Staff Regular, Admin y Superadmin) ---
router.get('/consult', requireAuth, controller.getConsult);
router.post('/checkin', requireAuth, controller.postCheckIn);

module.exports = router;
