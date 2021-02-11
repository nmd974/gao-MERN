const bcrypt = require('bcryptjs');
const db = require('../../../db');
const HttpError = require('../../../shared/http-error');
const mongodb = require('mongodb');


const signup = async (req, res, next) => {

  const { identifiant, password } = req.body;

  let hashedPW;
  try {
    hashedPW = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Impossible de créer le nouveau compte utilisateur.',
      500
    );
    return next(error);
  }

  
  try {
    db.getDb()
      .collection('administration')
      .insertOne(
        {
          identifiant: identifiant, 
          password: hashedPW
        }
      )
      .then(result =>{
        res
        .status(201)
        .json({ message: "Admin ajouté" });
      })
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Ajout dans la base de donnée impossible.',
      500
    );
    return next(error);
  };

}

exports.signup = signup;

