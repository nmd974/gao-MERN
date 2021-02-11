const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");

const getUsersAll = (req, res, next) => {
    let users = [];

    const resaId = ObjectID(req.params.resaId);
    
    try{
        db.getDb()
        .collection('users')
        .find()
        .forEach(user => {
            users.push(user);
        })
        .then(result => {
            res.status(201).json({users});
            
        })
    }catch (err){
        const error = new HttpError(
            "Impossible d'accéder à la liste des utilisateurs",
            500
        );
        return next(error);
    }
}

const getUsersById = (req, res, next) => {
    let users = [];

    const userId = req.params.userId;
    
    try{
        db.getDb()
        .collection('users')
        .find({_id: userId})
        .forEach(user => {
            users.push(user);
        })
        .then(result => {
            res.status(201).json({nom: users[0].nom, prenom: users[0].prenom, email: users[0].email});
        })
        .catch(err => {
            res.status(202).json({error: "Utilisateur inexistant"});
        })
        
    }catch (err){
        const error = new HttpError(
            "Impossible d'accéder à la liste des utilisateurs",
            500
        );
        return next(error);
    }
}


exports.getUsersAll = getUsersAll;
exports.getUsersById = getUsersById;