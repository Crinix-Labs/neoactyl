import axios from "axios";
import config from "../controller/config.ts";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.ts";
import express from "express";

const PTERO_API_URL = `${config.pterodactyl.panel}/api/application`;

const router = express.Router();

if (config.google.enabled) {
  async function createPterodactylUser(
    email: string,
    username: string
  ): Promise<number | null> {
    try {
      // Check if user already exists
      const users = await axios.get(`${PTERO_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${config.pterodactyl.api}`,
          "Content-Type": "application/json",
        },
      });

      const existingUser = users.data.data.find(
        (u: any) => u.attributes.email === email
      );
      if (existingUser) return existingUser.attributes.id; // Return existing user ID

      // Create user if not found
      const response = await axios.post(
        `${PTERO_API_URL}/users`,
        {
          email,
          username,
          first_name: username.split(" ")[0] || "User",
          last_name: username.split(" ")[1] || "Account",
          password: Math.random().toString(36).slice(-8), // Random password
          language: "en",
        },
        {
          headers: {
            Authorization: `Bearer ${config.pterodactyl.api}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.attributes.id;
    } catch (error) {
      console.error(
        "Pterodactyl User Creation Error:",
        error.response?.data || error.message
      );
      return null;
    }
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: `${config.domain.listen}${config.google.callback}`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ where: { googleId: profile.id } });
          let ptrlUser;

          try {
            ptrlUser = await axios.get(
              `${config.pterodactyl.panel}/api/application/users/${user?.id}`,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${config.pterodactyl.api}`,
                },
              }
            );
          } catch (error) {
            ptrlUser = null;
          }

          if (!user || !ptrlUser) {
            const id = await createPterodactylUser(
              profile.emails?.[0]?.value,
              profile.id
            );
            if (!id)
              return done(new Error("Failed to create Pterodactyl user"), null);

            user = await User.create({
              id: id,
              email: profile.emails?.[0]?.value || null,
              username: profile.displayName,
              password: Math.random().toString(36).slice(-8),
              googleId: profile.id,
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  router.use(passport.initialize());
  router.use(passport.session());

  passport.serializeUser((user: any, done) => {
    done(null, user.id); // Store user ID only
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  router.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get(
    config.google.callback,
    passport.authenticate("google", { failureRedirect: "/" }),
    async (req, res) => {
      const user = req.user;
      try {
        const ptrlUserResponse = await axios.get(
          `${config.pterodactyl.panel}/api/application/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${config.pterodactyl.api}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const ptrlUser = ptrlUserResponse.data.attributes;

        // Generate token with environment secret key
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            email: user.email,
            admin: ptrlUser.root_admin, // true if user is an admin
          },
          config.general.jwtSecret,
          { expiresIn: "1h" }
        );

        // Set token as an HttpOnly cookie
        await res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" || false,
          sameSite: "Strict",
          maxAge: 3600000, // 1 hour
        });
        res.redirect("/dashboard");
      } catch (error) {
        console.error("Error fetching Pterodactyl user:", error.message);
        res.redirect("/");
      }
    }
  );
}

export default router;
