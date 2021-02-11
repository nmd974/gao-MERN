const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");

const deletePoste =(req, res, next) => {

    const idPoste = ObjectID(req.params.posteId);

    try{
        db.getDb()
        .collection('postes')
        .deleteOne({_id: idPoste})
        .then(result => {
            res.status(201).json({message: "Poste supprimé"});
        })
    }catch (err){
        const error = new HttpError(
            'Impossible de supprimer ce poste informatique',
            500
        );
        return next(error); 
    }
    
    
}

exports.deletePoste = deletePoste;