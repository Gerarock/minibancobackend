"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Saldo = void 0;
const mongoose_1 = require("mongoose");
const saldoSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'usuario'
    }
});
/* interface ISaldo extends Document {
    monto: String;
    flag: String;
} */
exports.Saldo = mongoose_1.model('saldo', saldoSchema);
