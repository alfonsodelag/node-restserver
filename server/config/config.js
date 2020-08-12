// ===========
// Puerto
// ===========
process.env.PORT = process.env.PORT || 3000;


// ===========
// Entorno
// ===========
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========
// Vencimiento del Token
// ===========
// 60 segundos
// 60 minutos
// 24 horas
// 3 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ===========
// SEED de autenticación
// ===========
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
// process.env.PRODUCCION = process.env.PRODUCCION || 'este-es-el-seed-desarrollo';

// ===========
// Base de Datos
// ===========
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://alfonso:Panama11@webpersonal.bxdvq.mongodb.net/cafe?retryWrites=true&w=majority'
}


process.env.URLDB = urlDB;