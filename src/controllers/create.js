const Register = require('../models/Register')

exports.createAccountPage = (req, res) => {
  res.render("index", { page: "create-account" });
};

exports.register = async (req, res) => {
  try {
    const user = new Register(req.body)
    await user.register()
  
    if(user.errors.lenght > 0) {
      req.flash('errors', user.errors)
  
      req.session.save(() => {
        return res.redirect('back')
      })
      
      return
    }
    res.send(user.errors)
  } catch (e) {

    console.log(e)
    res.send(user.errors)
  }

}