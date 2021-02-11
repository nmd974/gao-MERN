const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");

const deleteResa =(req, res, next) => {

    const resaId = ObjectID(req.params.resaId);

    try{
        db.getDb()
        .collection('reservations')
        .deleteOne({_id: resaId})
        .then(result => {
            res.status(201).json({message: "Reservation annulée"});
        })
    }catch (err){
        const error = new HttpError(
            'Impossible de supprimer cette reservation',
            500
        );
        return next(error); 
    }
    
    
}

exports.deleteResa = deleteResa;