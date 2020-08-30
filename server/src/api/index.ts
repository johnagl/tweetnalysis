import * as express from 'express';

class API {
    private router: express.Router;

    public constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', (req, res) => {
            res.send('Server');
        });
    }

    public getRouter () : express.Router {
        return this.router;
    }
} 

export default API;