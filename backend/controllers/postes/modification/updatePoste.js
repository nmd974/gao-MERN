const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");

const updatePoste =(req, res, next) => {

    const idPoste = ObjectID(req.params.posteId);
    const content = req.body;


    try{
        db.getDb()
        .collection('postes')
        .updateOne({_id: idPoste}, {$set:{
            nom: content.nom,
        }})

        .then(result => {
            res.status(201).json({message: "Nom du poste modifié"});
        })
        .catch(err => {
            res.status(202).json({error : "Ce nom de poste est déjà utilisé"});
        })
    }catch (err){
        const error = new HttpError(
            'Ce poste informatique est introuvable',
            500
        );
        return next(error); 
    }
    
    
}

exports.updatePoste = updatePoste