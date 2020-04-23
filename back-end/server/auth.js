const auth = {
  login: (req, res, next) => {
    console.log("Logging in");

    const pool = req.app.get('pool');
    const qryStr = `
      select id,
        user_name,
        password,
        my_salt,
        login_type
      from public.login
      where user_name = $1
    `;
    const params = new Array(req.body.username);

    pool.selectOne(res, qryStr, params, 'user', next);
  },

  validate: (req, res) => {
    console.log("Validating");
    
    const bcrypt = require('bcrypt');
    const user = res.locals._user;
    const pwd = req.body.password;
    const saltStored=user.my_salt;
    const passwordStored = user.password;
    //hash the password from the form fields and compare to password stored
    bcrypt.hash(pwd, saltStored, function(err, hashed){ 
      if(err){
        console.log(err.message);
      } 
      if(passwordStored === hashed){
        console.log("Successfully logged in user "+user);
        res.status(200).json({username: user.user_name, id: user.id, logintype: user.login_type });
      }
      else{
        console.log("incorrect password");
        res.status(401).json({message:'incorrect password'});
      }
    });
  }
};

module.exports = auth;
