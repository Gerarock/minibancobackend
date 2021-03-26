import { Schema, model, Document } from 'mongoose';

const saldoSchema = new Schema({

    monto: {
        type: Number,
        unique: false,
        required: [true, 'Monto requerido']
    },
    flag: {
        type: String,
        unique: false
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }

});

/* interface ISaldo extends Document {
    monto: String;
    flag: String;
} */

export const Saldo = model('saldo', saldoSchema);