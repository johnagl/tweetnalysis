import express from 'express';
import bodyParser from 'body-parser';
import Twitter from '../api/twitter';

class Server {
    private app: express.Application;
    private port: Number;

    public constructor(port: Number) {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use("/api/twitter", new Twitter().getRouter());
        this.port = port;
    }

    public listen () : void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}

export default Server;