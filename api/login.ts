import Express from "express";
import jwt from "jsonwebtoken";

const router = Express.Router();

const user = {
  username: "samir717le",
  email: "samirthegamer717@gmail.com",
  is_root: true,
  discord: null,
  id: 1,
  password: "123",
};

router.post("/api/login", (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res.json({
      success: false,
      status: "failed",
      message: "All fields are required",
    });
  }

  if (user.email !== email || user.username !== username) {
    return res.json({
      success: false,
      status: "failed",
      message: "No user found with that info",
    });
  }

  if (user.password !== password) {
    return res.json({
      success: false,
      status: "failed",
      message: "Password mismatched, try again or reset your password",
    });
  }

  // Generate token with environment secret key
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email, is_root: user.is_root },
    process.env.JWT_SECRET || "default_secret_key",
    { expiresIn: "1h" }
  );

  // Set token as an HttpOnly cookie
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || false,
    sameSite: "Strict",
    maxAge: 3600000, // 1 hour
  });

  return res.json({ success: true, message: "Login successful" });
});

export default router;