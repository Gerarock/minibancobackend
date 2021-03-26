"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../models/usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../clases/token"));
const usuarioRutas = express_1.Router();
//Creación Usuario
usuarioRutas.post('/crear', (req, res) => {
    const usuario = {
        nombre: req.body.nombre,
        rut: req.body.rut,
        correo: req.body.correo,
        password: bcryptjs_1.default.hashSync(req.body.password, 10)
    };
    //Guarda Usuario en BD
    usuario_1.Usuario.create(usuario)
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
usuarioRutas.post('/login', (req, res) => {
    const body = req.body;
    usuario_1.Usuario.findOne({ rut: body.rut }, (err, usuarioBD) => {
        if (err)
            throw err;
        if (!usuarioBD) {
            return res.json({
                ok: false,
                mensaje: 'Datos Invalidos'
            });
        }
        if (usuarioBD.compararPassword(body.password)) {
            const token = token_1.default.getToken({
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
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Datos Invalidos'
            });
        }
    });
});
usuarioRutas.get('/:rut', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.Usuario.findOne(req.params);
    res.send(usuario);
}));
exports.default = usuarioRutas;
