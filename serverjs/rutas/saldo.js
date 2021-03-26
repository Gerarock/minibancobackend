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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const saldo_1 = require("../models/saldo");
const usuario_1 = require("../models/usuario");
const saldoRutas = express_1.Router();
//Guarda Monto relacionado con usuario
saldoRutas.post('/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saldoNuevo = new saldo_1.Saldo(req.body);
    const usuario = yield usuario_1.Usuario.findById(req.params);
    saldoNuevo.cliente = usuario;
    yield saldoNuevo.save();
    res.send(saldoNuevo);
}));
//Obtiene monto relacionado con usuario
/* saldoRutas.get('/:cliente/saldos', async (req, res) => {
    const usuario = await Saldo.findById(req.params).populate('usuario');
    res.send(usuario)
}) */
saldoRutas.get('/getSaldo/:cliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mensaje = yield saldo_1.Saldo.findOne(req.params)
        .sort({ cliente: -1 })
        .limit(50)
        .exec();
    res.json({
        ok: true,
        mensaje
    });
}));
//Guarda Monto
//saldoRutas.post('/', verifyToken, (req: any, res: Response) => {
saldoRutas.post('/', (req, res) => {
    const body = req.body;
    body.flag = "Carga Saldo";
    saldo_1.Saldo.create(body)
        .then(saldoBD => {
        res.json({
            ok: true,
            usuario: saldoBD
        });
    })
        .catch(err => {
        res.json(err);
    });
});
//Actualizar Monto
saldoRutas.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const saldoConst = {
        monto: req.body.monto
    };
    saldo_1.Saldo.findByIdAndUpdate(id, saldoConst, { new: true }, (err, saldoBD) => {
        if (err)
            throw err;
        if (!saldoBD) {
            return res.json({
                ok: false,
                mensaje: 'Data inválida'
            });
        }
        res.json({
            ok: true,
            saldoConst
        });
    });
});
//Obtener Monto
saldoRutas.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saldoConst = yield saldo_1.Saldo.find()
        .sort({ _id: -1 })
        .exec();
    res.json({
        ok: true,
        saldoConst
    });
}));
exports.default = saldoRutas;
