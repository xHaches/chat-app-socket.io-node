"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const sockets_1 = require("../sockets/sockets");
const router = express_1.Router();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: 'true',
        mensaje: 'Todo está bien'
    });
});
router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    // Enviar mensajes a chat general
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: 'true',
        cuerpo,
        de
    });
});
router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    // Enviar mensajes a usuario en particular
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: 'true',
        cuerpo,
        de,
        id
    });
});
// Servicio para obtener todos los id de los usuarios
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.allSockets()
        .catch((err) => {
        return res.json({
            ok: false,
            err
        });
    })
        .then((clientes) => {
        return res.json({
            ok: true,
            clientes: Array.from(clientes)
        });
    });
});
// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req, res) => {
    return res.json({
        ok: true,
        clientes: sockets_1.usuariosConectados.getLista()
    });
});
exports.default = router;
