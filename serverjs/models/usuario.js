"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarioSchema = new mongoose_1.Schema({
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
usuarioSchema.method('compararPassword', function (password = '') {
    if (bcryptjs_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = mongoose_1.model('usuario', usuarioSchema);
