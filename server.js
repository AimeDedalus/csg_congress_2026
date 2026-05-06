const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar archivos estáticos (Para imágenes y logos)
app.use(express.static('public'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de Sesión
app.use(session({
  secret: 'congreso-super-secreto',
  resave: false,
  saveUninitialized: false
}));

// Variable global para ocultar/mostrar elementos en las vistas EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// EJS Setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout');

// Rutas
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
