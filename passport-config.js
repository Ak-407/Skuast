const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

function initializePassport(passport, getUserByUsername, getUserById) {
    // Rate limiting middleware
    const loginLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 3, // Limit each IP to 3 login attempts per windowMs
        message: 'Too many login attempts from this IP, please try again later.'
    });

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById(id);
            if (user) {
                done(null, user);
            } else {
                done(new Error('User not found'));
            }
        } catch (error) {
            done(error);
        }
    });

    async function authenticateUser(username, password, done) {
        try {
            const user = await getUserByUsername(username);

            if (user == null) {
                return done(null, false, { message: 'No user with that username' });
            }

            if (!user.verified) {
                return done(null, false, { message: 'User is not verified' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (error) {
            return done(error);
        }
    }
}

module.exports = { initializePassport };
