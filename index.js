
// para crear la aplicacion
const express = require('express');
//para la configuracion del cors
const cors = require('cors');
const { dbConnection } = require('./db/config');
// para la configuracion de las variables de entorno y escuchar el puertyo configurado en el archivo de .env
require('dotenv').config();

// console.log(process.env);

const app = express();
 
// coneccion a la base de datos 
dbConnection();



// para leer el directorio publico donde se encuentran los archivos de la pagina a servir
app.use( express.static('public'));


// CORS
app.use( cors() ); 


// lectura y parseo del body de la peticion
app.use( express.json());


// inicializacion del midleware
app.use('/api/auth' , require('./routes/auth'));


// habilitar Puerto
app.listen(process.env.PORT, (req, res) => {
    console.log(`Servidor corriendo en el puert0o ${process.env.PORT}`);
});
