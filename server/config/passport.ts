import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import { User } from '../models/user.model';
import { config } from './config';
import bcrypt from 'bcryptjs';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Discord OAuth2 strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: config.discord.clientId,
      clientSecret: config.discord.clientSecret,
      callbackURL: config.discord.callbackUrl,
      scope: ['identify', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Look for user by email
        let user = await User.findOne({ where: { email: profile.email } });

        if (!user) {
          // Create new user if not found
          const tempPassword = Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(tempPassword, 10);

          user = await User.create({
            username: profile.username,
            email: profile.email || `${profile.id}@discord.user`,
            password: hashedPassword,
            coins: 0,
            isAdmin: false,
            createdAt: new Date(),
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

export default passport;