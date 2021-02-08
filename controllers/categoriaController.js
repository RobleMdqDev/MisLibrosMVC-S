const categoriaService = require('../services/categoriaService.js');
const categoriaModel = require('../models/categoria.js')
const trim = require('../funcionConEspacios.js');
const express = require('express');
const app = express.Router();



// CATEGORIA --------------------------------------------------------


/* 1 - Post <<<<<<<<<<<<<<<<<< 

Categoria recibe: {nombre:sting} retorna status 200{id: numerico, nombre:string} - 
status 413, {mensaje: <descripcion del error> que puede ser:
"faltan datos", "ese nombre de categoria ya existe", "error inesperado" **/

app.post('/categoria', async (req, res) => {

    try {
        if (!req.body.nombre) {
            throw new Error('Falta enviar el nombre');
        }
        if (await trim.conEspacios(req.body.nombre)) {
            throw new Error('Los campos requeridos no pueden permanecer con espacios vacios');
        }

        let nombre = req.body.nombre.toUpperCase();

        let respuesta = await categoriaService.nuevaCategoria(nombre)
        res.status(200).send({
            Nombre: nombre,
            Id: respuesta.insertId
        });
    } catch (e) {
        console.log(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});

/* 2 - Get CATEGORIA <<<<<<<<<<<<<<<<<<

'/categoria' retorna: status 200  y [{id:numerico, nombre:string}]  
- status: 413 y [] */

app.get('/categoria', async (req, res) => {
    try {
        let respuesta = await categoriaModel.listaCategorias();
        res.status(200).send({
            respuesta
        });
    } catch (e) {
        console.log(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});

/* 3 - Get ID <<<<<<<<<<<<<<<<<<

'/categoria/:id' retorna: status 200 y {id: numerico, nombre:string} - 
status: 413, {mensaje: <descripcion del error>} que puede 
ser: "error inesperado", "categoria no encontrada" */

app.get('/categoria/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let respuesta = await categoriaModel.categoriaId(id);
        res.status(200).send({
            respuesta
        });
    } catch (e) {
        console.log(e.message);
        res.status(413).send({
            error: 'Error inesperado'
        });
    }
});

/* 4 - Delete <<<<<<<<<<<<<<<<<<

'/categoria/:id' retorna: status 200 y {mensaje: "se borro correctamente"} 
- status: 413, {mensaje: <descripcion del error>} que puese ser: "error inesperado", 
"categoria con libros asociados, no se puede eliminar", "no existe la categoria 
indicada" */

app.delete('/categoria/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let respuesta = await categoriaService.borrarCategoria(id);
        res.status(200).send({
            respuesta: 'Se borro correctamente la categoria'
        });
    } catch (e) {
        console.error(e.message);
        res.status(413).send({
            error: e.message
        });
    }
});

module.exports = app;