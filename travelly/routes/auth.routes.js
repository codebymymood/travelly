const router = require("express").Router();
const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')

//shows login interface
router.get("/auth", (req, res, next) => {
  res.render("profile/auth.hbs");
});

router.post("/auth", (req, res, next) => {
  const {name, email, password} = req.body
  
  if (email == '' && password == ''){
    res.render('profile/auth.hbs', {error: 'Please enter your email and password!'})
    return;
}

  let passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  if(!passwordRegExp.test(password)){
      res.render('profile/auth.hbs', {error: "Please enter the minimum of 8 characters and at least one letter!"})
      return;
  } 

  let emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  if(!emailRegExp.test(email)){
      
      res.render('profile/auth.hbs', {error: 'This is not a valid e-mail'})
      return;
  }

  let salt = bcrypt.genSaltSync(12)
  let hash = bcrypt.hashSync(password, salt);

  UserModel.create({name, email, password:hash})

  .then((success)=>{
      res.redirect("/auth");
  })
  .catch((error)=>{
    if (name == ''){
        res.render('/profile/auth.hbs', {error: 'Please enter your name!'})
        return;
      }
      next(error)
  })

  
  UserModel.find({email})
  .then((userResponse)=>{
      if(userResponse.length){
          let userObj = userResponse[0]

          let isMatching = bcrypt.compareSync(password, userObj.password);

          if(isMatching){
              req.session.myProperty = userObj
              res.redirect('/profile')
          } else {
              res.render('profile/auth.hbs' , {error: 'Password not matching'})
              return;
          }
        } else {
            res.render('profile/auth.hbs', {error: 'User does not exist'})
            return;
        }
  })
  .catch((error)=>{
      next(error)
  })
});

const isLogged = (req, res, next) => {
    req.session.myProperty ? next() : res.redirect('/auth')
}

router.get('/logout', isLogged, (req, res, next) => {
    req.session.destroy()
    res.redirect('/auth')
})



module.exports = router;