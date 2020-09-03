import * as express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';


class Register {
    private router: express.Router;

    public constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() : void {        
        this.router.post('/',  async (req, res) => {
            let email = req.query.email;
            let password = req.query.password;
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new User({
                    username: email,
                    password: hashedPassword
                })
                let saveUser = await user.save();
                console.log(saveUser);
                res.status(200).send(`${email} successfully registered`);
            } catch (err) {
               // TODO: Fix error handling to be more user friendly
               res.status(500).send(`Unable to register ${email}`);
            }
        });
    }

    public getRouter () : express.Router {
        return this.router;
    }
} 

export default Register;