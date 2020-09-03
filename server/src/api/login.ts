import * as express from 'express';
import User from '../models/user';

class Login {
    private router: express.Router;

    public constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() : void {
        this.router.get('/', (req, res) => {
            res.send('get api/login');
        });
        this.router.post('/', (req, res) => {
            res.send('post api/login');
        });
    }

    public getRouter () : express.Router {
        return this.router;
    }
} 

export default Login;