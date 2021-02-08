const conexion = require('../db.js');

module.exports = {
	nombreUsuario: async (usuario) => {
		var respuesta = await conexion.query(
			'SELECT * from usuarios WHERE nombre_usuario = ?', 
			[usuario]);
		return respuesta;
	},
	claveUsuario: async (usuario) => {
		var respuesta = await conexion.query(
			'SELECT clave_encriptada FROM usuarios WHERE nombre_usuario = ?', 
			[usuario]);
		return respuesta;
	},
	emailUsuario: async (usuario) => {
		var respuesta = await conexion.query(
			'SELECT email_usuario FROM usuarios WHERE nombre_usuario = ?', 
			[usuario]);
		return respuesta;
	},
	idUsuario: async (usuario) => {
		var respuesta = await conexion.query(
			'SELECT usuario_id FROM usuarios WHERE nombre_usuario = ?', 
			[usuario]);
		return respuesta;
	},
	nuevoUsuario: async (usuario) => {
		var respuesta = await conexion.query(
			'INSERT INTO usuarios (nombre_usuario, clave_encriptada, email_usuario, celu_usuario) VALUE (?,?,?,?)', 
			[usuario.usuario, usuario.clave, usuario.email, usuario.celu]);
		return respuesta;
	}
}