const router = require("express").Router();

//shows login interface
router.get("/auth", (req, res, next) => {
  res.render("../views/profile/auth.hbs");
});

module.exports = router;