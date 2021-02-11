const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");

const getReservationById = (req, res, next) => {
    let reservations = [];

    const resaId = ObjectID(req.params.resaId);
    
    try{
        db.getDb()
        .collection('reservations')
        .find({_id: resaId})
        .forEach(reservation => {
            reservations.push(reservation);
        })
        .then(result => {
            res.status(201).json({reservations});
            
        })
    }catch (err){
        const error = new HttpError(
            "Impossible d'accéder aux reservations",
            500
        );
        return next(error);
    }
}


const getReservation = (req, res, next) => {
    let reservations = [];

    // let dateOfDay = new Date();

    // const fullDate = dateOfDay.getFullYear() 
    //                 + `${dateOfDay.getMonth() < 10 ? "-0" : "-"}` 
    //                 + (dateOfDay.getMonth()+1) + "-" + dateOfDay.getDate();

    try{
        db.getDb()
        .collection('reservations')
        .find()
        .forEach(reservation => {
            reservations.push(reservation);
        })
        .then(result => {
            res.status(201).json({reservations});
            
        })
    }catch (err){
        const error = new HttpError(
            "Impossible d'accéder aux reservations",
            500
        );
        return next(error);
    }
}

const getReservationByDate = (req, res, next) => {
    let reservations = [];

    const dateSelected = req.body;
    
    try{
        db.getDb()
        .collection('reservations')
        .find({dateReservation: dateSelected.date})
        .forEach(reservation => {
            reservations.push(reservation);
        })
        .then(result => {
            res.status(201).json({reservations});
            
        })
    }catch (err){
        const error = new HttpError(
            "Impossible d'accéder aux reservations",
            500
        );
        return next(error);
    }
}

exports.getReservationById = getReservationById;
// exports.getReservationByDateByPoste = getReservationByDateByPoste;
exports.getReservationByDate = getReservationByDate;
exports.getReservation = getReservation;