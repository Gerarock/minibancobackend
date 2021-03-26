import { Response, NextFunction } from 'express';
import Token from '../clases/token';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {

    const userToken = req.get('token') || '';

    Token.checkToken(userToken)
        .then((decoded: any) => {
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
}