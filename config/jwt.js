const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { getUser } = require('../repositories/users');
require('dotenv').config();


const setJWTStrategy = () => {
    const params = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    };
    passport.use(
        new JWTStrategy(
            params,
            async (jwtPayload, done) => {
                try {
                    const user = await getUser({ _id: jwtPayload.id });
                    if (!user) {
                        return done(new Error('User not found'));
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};

module.exports = setJWTStrategy;