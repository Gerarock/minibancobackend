"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const token_1 = __importDefault(require("../clases/token"));
const verifyToken = (req, res, next) => {
    const userToken = req.get('token') || '';
    token_1.default.checkToken(userToken)
        .then((decoded) => {
        req.usuario = decoded.usuario;
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token Inválido',
            err
        });
    });
};
exports.verifyToken = verifyToken;
