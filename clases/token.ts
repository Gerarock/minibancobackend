import jwt from 'jsonwebtoken';

export default class Token {

    private static seed: string = 'seed,privacyminibanco';
    private static expiration: string = '1800'; //Media hora

    constructor() { }

    static getToken(payload: any): string {
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.expiration });
    }

    static checkToken(userToken: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();
                } else {
                    resolve(decoded);
                }
            });
        });
    }

}