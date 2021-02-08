'use strict'

// Pedidos de paquetes ------------------------------------------
const express = require('express');
const jwt = require('jsonwebtoken');
const unless = require('express-unless');
const cors = require('cors');
const port = process.env.PORT ? process.env.PORT : 3005;

// Requerimiento de carpetas-----------------------------------------
const categoriaController = require('./controllers/categoriaController.js');
const personaController = require('./controllers/personaController.js');
const libroController = require('./controllers/libroController.js');
const usuarioController = require('./controllers/usuarioController.js');

// Declaración del paquete express en aplicación-----------------
const app = express();


// Autenticación (Middleware) ----------------------------------------
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'Secret', (err, decoded) => {
            if (err) {
                return res.send({
                    mensaje: 'Token inválida'
                });
            } else {
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
};

// const auth = ((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

// app.use('/', auth);
auth.unless = unless;

// Llamada del middleware especifico del paquete-----------------
app.use('/', auth.unless({
    path: [{
        url: '/login',
        methods: ['POST']
    }, {
        url: '/registro',
        methods: ['POST']
    }]
}));





app.use(express.json()); //permite el mapeo de la peticion json a object js 
app.use(express.static('public')); // permite uso de la carpeta con el nombre expresado

app.use(cors());

app.use('/', libroController);
app.use('/', personaController);
app.use('/', usuarioController);
app.use('/', categoriaController);


// Establecer puerto  -------------------------------------------

app.listen(port, () => {
    console.log('Aplicación operativa.\nEscuchando el puerto ' + port)
});



