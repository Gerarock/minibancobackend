import { Router, Response } from 'express';
import { verifyToken } from '../middleware/authentication';
import { Saldo } from '../models/saldo';
import { Usuario } from "../models/usuario";
import usuarioRutas from './usuario';

const saldoRutas = Router();

//Guarda Monto relacionado con usuario
saldoRutas.post('/:_id', async (req, res) => {
    const saldoNuevo = new Saldo(req.body);
    const usuario = await Usuario.findById(req.params);
    saldoNuevo.cliente = usuario
    await saldoNuevo.save();
    res.send(saldoNuevo);
});

//Obtiene monto relacionado con usuario
/* saldoRutas.get('/:cliente/saldos', async (req, res) => {
    const usuario = await Saldo.findById(req.params).populate('usuario');
    res.send(usuario)
}) */


saldoRutas.get('/getSaldo/:cliente', async (req: any, res: Response) => {
    
    const mensaje = await Saldo.findOne(req.params)
        .sort({ cliente: -1 })
        .limit(50)
        .exec();

    res.json({
        ok: true,
        mensaje
    })
})



//Guarda Monto
//saldoRutas.post('/', verifyToken, (req: any, res: Response) => {
saldoRutas.post('/', (req: any, res: Response) => {

    const body = req.body;
    body.flag = "Carga Saldo"

    Saldo.create(body)
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
saldoRutas.post('/update/:id', (req: any, res: Response) => {

    const id = req.params.id;

    const saldoConst = {
        monto: req.body.monto
    }

    Saldo.findByIdAndUpdate(id, saldoConst, { new: true }, (err, saldoBD) => {
        if (err) throw err;
        if (!saldoBD) {
            return res.json({
                ok: false,
                mensaje: 'Data inválida'
            });
        }
        res.json({
            ok: true,
            saldoConst
        })
    });
});

//Obtener Monto
saldoRutas.get('/', async (req: any, res: Response) => {

    const saldoConst = await Saldo.find()
        .sort({ _id: -1 })
        .exec();
    res.json({
        ok: true,
        saldoConst
    });

});

export default saldoRutas;