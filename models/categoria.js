const conexion = require('../db.js');

module.exports = {
	nombreCategoria: async (nombre) => {
		let respuesta = await conexion.query(
			'SELECT id FROM genero WHERE nombre = ?', [nombre]);
		return respuesta;
	},
	nuevaCategoria: async (nombre) => {
		let respuesta = await conexion.query(
			'INSERT INTO genero (nombre) VALUE (?)', [nombre]);
		return respuesta;
	},
	categoriaId: async (id) => {
		let respuesta = await conexion.query(
			'SELECT * FROM genero WHERE id = ?', [id]);
		return respuesta;
	},
	listaCategorias: async () => {
		let respuesta = await conexion.query(
			'SELECT * FROM genero');
		return respuesta;
	},
	categoriaLibros: async (id) => {
		let respuesta = await conexion.query(
			'SELECT * FROM libros WHERE categoria_id = ?', [id]);
		return respuesta;
	},
	borrarCategoria: async (id) => {
		let respuesta = await conexion.query(
			'DELETE FROM genero WHERE id = ?', [id]);
		return respuesta;
	}
}