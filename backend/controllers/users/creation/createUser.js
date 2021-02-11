const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");


const createUser = async (req, res, next) => {

    const {nom, prenom, email} = req.body;
    let _id = new ObjectID().toString().substr(19, 6);


        try{
            db.getDb()
            .collection('users')
            .insertOne({ 
                _id: _id,       
                nom: nom,
                prenom: prenom,
                email: email
            })
            .then(result => {
                res.status(201).json({message : `Utilisateur ajouté dans la base de donnée`});
            })
            .catch(err => {
                res.status(202).json({error : `Ce mail est déjà existant dans la base de donnée`});
            })
        }catch (err){
            const error = new HttpError(
                "Impossible de créer ce nouvel utilisateur, vérifiez si l'adresse mail n'est pas déjà existante",
                500
            );
            return next(error);
        }
}

exports.createUser = createUser;