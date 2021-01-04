"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('====Actualizando usuario===');
        console.log(this.lista);
    }
    // Obtener lista de usuarios
    getLista() {
        return this.lista.filter((usuario) => usuario.nombre !== 'sin-nombre');
    }
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    // Obtener usuario en una sala en particular
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    // Borrar usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        console.log(this.lista);
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
