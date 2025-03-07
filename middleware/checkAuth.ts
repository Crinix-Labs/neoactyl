import express from "express";
import jwt from "jsonwebtoken";
import config from "../controller/config.ts"; // Import the config file

const jwtSecret = config.general.jwtSecret;

const checkAuth = (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Attach user data to request

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default checkAuth;
