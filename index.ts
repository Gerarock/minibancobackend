import Server from "./clases/server";
import usuarioRutas from "./rutas/usuario";
import saldoRutas from "./rutas/saldo";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import express from 'express';
import path from 'path';

const server = new Server();

//Body Parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//CORS
server.app.use(cors({origin: true, credentials: true}));

//Rutas
server.app.use(express.static(path.join((__dirname + '/public'))));
server.app.use('/usuario', usuarioRutas);
server.app.use('/saldo', saldoRutas);

//Conexion Base de Datos Mongo
let mongoDB: string;

if(process.env.NODE_ENV === 'production') {
    mongoDB = 'mongodb+srv://admin:admin5243@cluster0.z5hkl.mongodb.net/minibanco'
} else {
    mongoDB = 'mongodb://localhost:27017/minibanco'
}

mongoose.connect(
    mongoDB,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if(err) throw "err";
        console.log('Base de Datos correcta');
    }
)

//Iniciar servidor
server.start( () => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
}); 