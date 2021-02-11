const db = require("../../../db");
const HttpError = require("../../../shared/http-error");


const createNewPoste =(req, res, next) => {
    let poste = req.body;
    
    try{
        db.getDb()
        .collection('postes')
        .insertOne({        
            nom: poste.nom
        })
        .then(result => {
            res.status(201).json({message : `Creation du nouveau poste informatique ${poste.nom} confirmée`});
        })
        .catch(err => {
            res.status(202).json({error : "Ce nom de poste est déjà utilisé"});
        })
    }catch (err){
        const error = new HttpError(
            "Impossible d'ajouter un nouveau poste",
            500
        );
        return next(error);
    }
}

exports.createNewPoste = createNewPoste;