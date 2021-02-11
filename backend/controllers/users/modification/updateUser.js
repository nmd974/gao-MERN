const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");


const updateUser = async (req, res, next) => {

    const {nom, prenom, email} = req.body;
    const userId = req.params.userId;

        try{
            db.getDb()
            .collection('users')
            .updateOne(
                {_id: userId}, 
                {$set:
                    {
                        nom: nom,
                        prenom: prenom,
                        email: email
                    }
                }
            )
            .then(result => {
                res.status(201).json({message : `Utilisateur modifié`});
            })
        }catch (err){
            const error = new HttpError(
                "Impossible de modifier cet utilisateur",
                500
            );
            return next(error);
        }
    }


exports.updateUser = updateUser;