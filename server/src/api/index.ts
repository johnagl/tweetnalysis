import * as express from 'express';

class API {
    private router: express.Router;

    public constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() : void {
        this.router.get('/', (req, res) => {
            res.send('api/');
        });
    }

    public getRouter () : express.Router {
        return this.router;
    }
} 

export default API;