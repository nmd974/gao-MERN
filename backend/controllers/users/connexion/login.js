const HttpError = require('../../../shared/http-error');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const db = require('../../../db');

let userId;
let userData;
let pwdVerify;


// const createToken = (userData) => {
//     return jwt.sign(
//       {
//         userId: userData
//       }
//     , process.env.JWT, { expiresIn: '1h' });
//   };



const login = async (req, res, next) => {

  console.log("JE PASSE ICI?");

    const password = req.body.password;
    const identifiant = req.body.identifiant;

    try{
      pwdVerify = await db.getDb().collection('administration').findOne( { identifiant: identifiant } )
      .then(userDoc => {
          userData = userDoc;
          return bcrypt.compare(password, userDoc.password)
      });
    }catch(err){
      console.log(err);
      const error = new HttpError('Utilisateur inexistant.', 202);
      return next(error);
    }

    if(!pwdVerify){
      const error = new HttpError('Mot de passe incorrect.', 202);
      return next(error);
    }else{
      
      db.getDb()
      .collection('sessions')
      .insertOne({createdAt: new Date})

      // userId = userData.pseudo;

      res.status(201).json({
        // token: createToken(userId),
        // message: "Bienvenue sur l'outil de gestion des attributions de postes informatiques du centre culturel"
        isLoggedIn: true
      });
    }
        
};
    

exports.login = login;
