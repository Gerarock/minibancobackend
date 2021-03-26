"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const usuario_1 = __importDefault(require("./rutas/usuario"));
const saldo_1 = __importDefault(require("./rutas/saldo"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server = new server_1.default();
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas
server.app.use(express_1.default.static(path_1.default.join((__dirname + '/public'))));
server.app.use('/usuario', usuario_1.default);
server.app.use('/saldo', saldo_1.default);
//Conexion Base de Datos Mongo
let mongoDB;
if (process.env.NODE_ENV === 'production') {
    mongoDB = 'mongodb+srv://admin:admin5243@cluster0.z5hkl.mongodb.net/minibanco';
}
else {
    mongoDB = 'mongodb://localhost:27017/minibanco';
}
mongoose_1.default.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err)
        throw "err";
    console.log('Base de Datos correcta');
});
//Iniciar servidor
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
