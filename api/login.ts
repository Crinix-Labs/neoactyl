import Express from "express";
import jwt from "jsonwebtoken";

const router = Express.Router();

const user: Object = {
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
    res.json({
      success: false,
      status: "failed",
      message: "All feilds are required",
    });
  } else if (!password) {
    res.json({
      success: false,
      status: "failed",
      message: "Password is required",
    });
  }
  if (!user.email === email || !user.username === username) {
    res.json({
      success: false,
      status: "failed",
      message: "No user found with that info",
    });
  } else if (!user.password === password) {
    res.json({
      success: false,
      status: "failed",
      message: "Password mismatched try again or reset your password",
    });
  } else {
    const token = jwt.sign(
      user,
      "anything can be secret try if you can find it its very loooooong brotha"
    );
    res.json({ success: true, token, user });
  }
});

export default router;
