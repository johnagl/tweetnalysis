import express from 'express';
import bodyParser from 'body-parser';
import Twitter from '../api/twitter';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Request, Response } from "express";
import Login from '../api/login';
import Register from '../api/register';


dotenv.config();
const databaseUrl = process.env.DATABASE_URL!;

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db : mongoose.Connection = mongoose.connection;
db.on('error', (error:any) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

class Server {
    private app: express.Application;
    private port: Number;

    public constructor(port: Number) {
        this.app = express();
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(bodyParser.json());
        this.app.use("/api/twitter", new Twitter().getRouter());
        this.app.use("/api/login", new Login().getRouter());
        this.app.use("/api/register", new Register().getRouter());
        this.port = port;

    }

    public listen () : void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}

export default Server;