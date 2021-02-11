const db = require("../../../db");
const HttpError = require("../../../shared/http-error");

const getAllPostes = (req, res, next) => {
    let postes = [];

    
    try{
        db.getDb()
        .collection('postes')
        .find()
        .sort({nom: 1})
        .forEach(poste => {
            postes.push(poste);
        })
        .then(result => {
            res.status(201).json({postes});
            
        })
    }catch (err){
        const error = new HttpError(
            "Impossible d'accéder au contenu",
            500
        );
        return next(error);
    }
}

exports.getAllPostes = getAllPostes;
