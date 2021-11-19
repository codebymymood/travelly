const router = require("express").Router();
const UserModel = require('../models/User.model')
const bcrypt = require('bcryptjs')

//shows login interface
router.get("/auth", (req, res, next) => {
  res.render("../views/profile/auth.hbs");
});

router.post("/auth", (req, res, next) => {
  const {name, email, password} = req.body

  let passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  if(!passwordRegExp.test(password)){
      res.render('../views/profile/auth.hbs')
      return;
  } 

  let usernameRegExp = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
  if(!usernameRegExp.test(name)){
      res.render('../views/profile/auth.hbs')
      return;
  }

  let emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  if(!emailRegExp.test(email)){
      res.render('../views/profile/auth.hbs')
      return;
  }

  let salt = bcrypt.genSaltSync(12)
  let hash = bcrypt.hashSync(password, salt);

  UserModel.create({name, email, password:hash})
  .then(()=>{
      res.redirect('/')
  })
  .catch((error)=>{
      next(error)
  })
});


module.exports = router;