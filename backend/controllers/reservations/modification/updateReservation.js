const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");


const updateResa = async (req, res, next) => {

    const {heureDebut, heureFin, dateReservation, posteNom} = req.body;
    const resaId = ObjectID(req.params.resaId);

    let reservationToVerify = [];
    let disponibiliteVerify = true;
    let posteId;

    try{
        await db.getDb()
        .collection('postes')
        .find({nom: posteNom})
        .forEach(postes => {
            if(postes.nom === posteNom){
                console.log(postes);
                posteId = ObjectID(postes._id);
            };
        })
    }catch (err){
        const error = new HttpError(
            "Impossible d'accéder aux postes enregistrés",
            500
        );
        return next(error);
    }

    try{
        await db.getDb()
        .collection('reservations')
        .find({$and:[{poste: posteId}, {dateReservation: dateReservation}]})
        .forEach(reservation => {
            if(reservation._id !== req.params.resaId){
                reservationToVerify.push(reservation);
            };
        })
    }catch (err){
        const error = new HttpError(
            "Impossible d'accéder aux reservations",
            500
        );
        return next(error);
    }

    for (let i = 0; i < reservationToVerify.length; i++) {
        console.log(reservationToVerify);
        if(
            heureDebut >= reservationToVerify[i].heureDebut && heureDebut < reservationToVerify[i].heureFin ||
            heureFin > reservationToVerify[i].heureDebut && heureFin <= reservationToVerify[i].heureFin ||
            heureDebut <= reservationToVerify[i].heureDebut && heureFin >= reservationToVerify[i].heureFin
        )
        
        {
            disponibiliteVerify = false;
            const error = new HttpError(
                "Il y a un conflit de reservation sur ce poste, merci de vérifier les disponibilités horaires.",
                500
            );
            return next(error);
        }
    }
    
    if(disponibiliteVerify){
        try{
            db.getDb()
            .collection('reservations')
            .updateOne(
                {_id: resaId}, 
                {$set:
                    {
                        dateReservation: dateReservation,
                        poste: posteId,
                        heureDebut: heureDebut,
                        heureFin: heureFin
                    }
                }
            )
            .then(result => {
                res.status(201).json({message : `Reservation confirmée`});
            })
        }catch (err){
            const error = new HttpError(
                "Impossible de créer cette reservation",
                500
            );
            return next(error);
        }
    }
}

exports.updateResa = updateResa;