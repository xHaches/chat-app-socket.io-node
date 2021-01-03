"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
exports.conectarCliente = (cliente) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
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
        console.log('ola');
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
