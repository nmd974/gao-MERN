const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");


const createNewResa = async (req, res, next) => {

    const {heureDebut, heureFin, dateReservation, creneau} = req.body;
    const userId = req.params.userId;
    const posteId = ObjectID(req.params.posteId);

    // let reservationToVerify = [];
    // let disponibiliteVerify = true;

    // try{
    //     await db.getDb()
    //     .collection('reservations')
    //     .find({$and:[{poste: posteId}, {dateReservation: dateReservation}]})
    //     .forEach(reservation => {
    //         reservationToVerify.push(reservation);
    //     })
    // }catch (err){
    //     const error = new HttpError(
    //         "Impossible d'accéder aux reservations",
    //         500
    //     );
    //     return next(error);
    // }

    // for (let i = 0; i < reservationToVerify.length; i++) {
    //     console.log(reservationToVerify);
    //     if(
    //         heureDebut >= reservationToVerify[i].heureDebut && heureDebut < reservationToVerify[i].heureFin ||
    //         heureFin > reservationToVerify[i].heureDebut && heureFin <= reservationToVerify[i].heureFin ||
    //         heureDebut <= reservationToVerify[i].heureDebut && heureFin >= reservationToVerify[i].heureFin
    //     )
        
    //     {
    //         disponibiliteVerify = false;
    //         const error = new HttpError(
    //             "Il y a un conflit de reservation sur ce poste, merci de vérifier les disponibilités horaires.",
    //             500
    //         );
    //         return next(error);
    //     }
    // }
    
    // if(disponibiliteVerify){
        try{
            db.getDb()
            .collection('reservations')
            .insertOne({        
                dateReservation: dateReservation,
                poste: posteId,
                utilisateur: userId,
                // heureDebut: heureDebut,
                // heureFin: heureFin,
                creneau: creneau
            })
            .then(result => {
                res.status(201).json({confirmation : `Reservation confirmée`});
            })
            .catch(err => {
                res.status(202).json({error : `Impossible de créer cette reservation`});
            })
        }catch (err){
            const error = new HttpError(
                "Impossible de créer cette reservation",
                500
            );
            return next(error);
        }
    // }
}

exports.createNewResa = createNewResa;