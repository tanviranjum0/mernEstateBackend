const { signup, login, signOut } = require("../handlers/auth");
const express = require("express");
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/signout", signOut);
module.exports = router;
