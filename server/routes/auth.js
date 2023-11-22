const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  setVoiceUploaded
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.put("/setvoice/:id", setVoiceUploaded);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
