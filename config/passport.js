/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */

const passport = require('passport');
const LocalStrategy = require('passport-local');
var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const validatePassword = require('../utils/validatePassword');
const User = require('../models').User;

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			// Recover the user
			let user = await User.findOne({ where: { email } });

			if (!user) {
				return done(null, false, {
					errors: { account: 'Invalid account' }
				});
			}

			// Validate password
			if (!validatePassword(password, user.password)) {
				return done(null, false, {
					errors: { password: 'Password is invalid' }
				});
			}

			return done(null, user);
		}
	)
);

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
};
passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		const user = await User.findOne({ where: { id: jwt_payload.id } });

		if (!user) {
			return done(null, false, {
				errors: { token: 'Invalid token' }
			});
		}

		return done(null, user);
	})
);
