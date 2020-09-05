import * as express from 'express';
import passport from "../passport-config";
class Login {
    private router: express.Router;

    public constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() : void {
        this.router.post("/", (req, res, next) => {
            passport.authenticate("local", function(err, user, info) {
                if (err) {
                    console.log('this error');
                    return res.status(400).json({ errors: err });
                }
                if (!user) {
                    console.log('this error2');
                    return res.status(400).json({ errors: "No user found" });
                }
                req.logIn(user, function(err) {
                    if (err) {
                        return res.status(400).json({ errors: err });
                    }
                    return res.status(200).json({ success: `logged in ${user.id}` });
                });
            })(req, res, next);
        });
    }

    public getRouter () : express.Router {
        return this.router;
    }
} 

export default Login;