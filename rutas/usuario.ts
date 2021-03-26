import { Router, Request, Response } from "express";
import { Usuario } from "../models/usuario";
import bcrypt from 'bcryptjs';
import Token from "../clases/token";

const usuarioRutas = Router();

//Creación Usuario
usuarioRutas.post('/crear', (req: Request, res: Response) => {

    const usuario = {
        nombre: req.body.nombre,
        rut: req.body.rut,
        correo: req.body.correo,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    //Guarda Usuario en BD
    Usuario.create(usuario)
        .then(usuarioBD => {
            res.json({
                ok: true,
                usuario: usuarioBD
            });
        })
        .catch(err => {
            res.json({
                ok: false,
                err
            });
        });

});

//Login
usuarioRutas.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    Usuario.findOne({ rut: body.rut }, (err: any, usuarioBD: any) => {
        if (err) throw err;
        if (!usuarioBD) {
            return res.json({
                ok: false,
                mensaje: 'Datos Invalidos'
            });
        }

        if (usuarioBD.compararPassword(body.password)) {

            const token = Token.getToken({
                _id: usuarioBD._id,
                nombre: usuarioBD.nombre,
                rut: usuarioBD.rut,
                correo: usuarioBD.correo,
                password: usuarioBD.password
            });

            res.json({
                ok: true,
                token: token
            });

        } else {
            return res.json({
                ok: false,
                mensaje: 'Datos Invalidos'
            });
        }

    });
});

usuarioRutas.get('/:rut', async (req, res) => {
    const usuario = await Usuario.findOne(req.params);
    res.send(usuario)
})

export default usuarioRutas;