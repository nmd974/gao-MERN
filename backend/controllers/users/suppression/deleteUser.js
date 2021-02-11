const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");

const deleteUser =(req, res, next) => {

    const userId = req.params.userId;

    try{
        db.getDb()
        .collection('users')
        .deleteOne({_id: userId})
        .then(result => {
            res.status(201).json({message: "Utilisateur supprimé"});
        })
    }catch (err){
        const error = new HttpError(
            'Impossible de supprimer cet utilisateur',
            500
        );
        return next(error); 
    }
    
    
}

exports.deleteUser = deleteUser;