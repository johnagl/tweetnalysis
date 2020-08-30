import express from 'express';
import bodyParser from 'body-parser';
import API from '../api/index';

class Server {
    private app: express.Application;
    private port: Number;

    public constructor(port: Number) {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use("/", new API().getRouter());
        this.port = port;
    }

    public listen () : void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}

export default Server;