"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuarios = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
exports.conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
// Escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload, callback) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
// Escuchar login
exports.configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
// Obtener usuarios
exports.obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
