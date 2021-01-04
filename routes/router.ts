

import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();


router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: 'true',
        mensaje: 'Todo está bien'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    // Enviar mensajes a chat general
    server.io.emit('mensaje-nuevo', payload);



    res.json({
        ok: 'true',
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    // Enviar mensajes a usuario en particular
    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: 'true',
        cuerpo,
        de,
        id
    });
});


// Servicio para obtener todos los id de los usuarios
router.get('/usuarios', (req: Request, res: Response) => {
    
    const server = Server.instance;
    server.io.allSockets()
    .catch((err) => {
        return res.json({
            ok: false,
            err
        });
    })
    .then((clientes: any) => {
        return res.json({
            ok: true,
            clientes: Array.from(clientes)
        });
    });
    
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {

    return res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
});


export default router