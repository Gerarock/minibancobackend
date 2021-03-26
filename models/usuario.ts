import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        unique: false,
        required: [true, 'Nombre obligatorio']
    },
    rut: {
        type: String,
        unique: true,
        required: [true, 'Rut obligatorio']
    },
    correo: {
        type: String,
        unique: false,
        required: [true, 'Correo obligatorio']
    },
    password: {
        type: String,
        unique: false,
        required: [true, 'Password obligatorio']
    }

});

usuarioSchema.method('compararPassword', function(password: string = ''): boolean {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }
});

interface IUsuario extends Document {
    nombre: string;
    rut: string;
    correo: string;
    password: string;
    compararPassword(password: string): boolean
}

export const Usuario = model<IUsuario>('usuario', usuarioSchema);