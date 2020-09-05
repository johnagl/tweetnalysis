import passport from 'passport';
import { PassportStatic } from 'passport';
import * as localStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import User from './models/user';
import { Request, Response, NextFunction } from "express";

const LocalStrategy = localStrategy.Strategy;

passport.serializeUser((user, done) => {
    done(null, (user as any).id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
     User.findOne({ username: email.toLowerCase() }, async (err, user: any) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: `Email ${email} not found.` });
            }
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null,user);
                } else {
                    return done(null, false, {message: 'Password incorrect'});
                }
            } catch (e) {
                done(e);
            }
        });
    }));


export default passport;