"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensaje = exports.desconectar = void 0;
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};
// Escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload, callback) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
