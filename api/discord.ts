import express from "express";
import session from "express-session";
import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/User.ts"; // Sequelize model
import config from "../controller/config.ts";

const router = express.Router();

// Middleware for session
router.use(
  session({
    secret: config.general.jwtSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // Set to true if using HTTPS
  })
);

// Redirect user to Discord OAuth2 authorization
router.get("/auth/discord", (req, res) => {
  const discordAuthURL = `https://discord.com/api/oauth2/authorize?client_id=${
    config.discord.clientId
  }&redirect_uri=${encodeURIComponent(
    `http://${req.hostname}${config.discord.callback}`
  )}&response_type=code&scope=identify%20email`;

  res.redirect(discordAuthURL);
});

// Handle Discord OAuth2 callback
router.get(config.discord.callback, async (req, res) => {
  const code = req.query.code as string;
  if (!code) return res.redirect("/");

  try {
    // Exchange code for an access token
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: config.discord.clientId,
        client_secret: config.discord.clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: `http://${req.hostname}${config.discord.callback}`,
        scope: "identify email",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch user details from Discord API
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const profile = userResponse.data;

    // Check if user exists in the database
    let user = await User.findOne({ where: { id: profile.id } });

    // Check if user exists in Pterodactyl
    let ptrlUser;
    if (user) {
      try {
        const ptrlResponse = await axios.get(
          `${config.pterodactyl.panel}/api/application/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${config.pterodactyl.api}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        ptrlUser = ptrlResponse.data;
      } catch (err) {
        ptrlUser = null; // User not found in Pterodactyl
      }
    }

    if (!user || !ptrlUser) {
      // Create user in Pterodactyl if not exists
      const ptrlUserResponse = await axios.post(
        `${config.pterodactyl.panel}/api/application/users`,
        {
          email: profile.email || `${profile.id}@discord.com`,
          username: profile.id,
          first_name: profile.username,
          last_name: profile.id,
        },
        {
          headers: {
            Authorization: `Bearer ${config.pterodactyl.api}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const ptrlUserId = ptrlUserResponse.data.attributes.id;

      // Create user in database
      user = await User.create({
        id: ptrlUserId,
        email: profile.email || null, // Discord might not provide email
        username: profile.id,
        password: Math.floor(Math.random() * 999999999),
      });
    }

    // Ensure user exists before creating a token
    if (!user) {
      console.error("User creation failed.");
      return res.redirect("/");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, config.general.jwtSecret, {
      expiresIn: "7d",
    });

    // Set cookie-based session
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.error(
      "Discord OAuth Error:",
      error.response?.data || error.message
    );
    res.redirect("/");
  }
});

// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("authToken");
  req.session.destroy(() => res.redirect("/"));
});

export default router;
