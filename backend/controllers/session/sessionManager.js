const db = require("../../db");
const HttpError = require("../../shared/http-error");


const createSession = async (req, res, next) => {

    try{
        db.getDb()
        .collection('sessions')
        .insertOne({createdAt: new Date})
        .then(res => {
            res.status(201).json({isLoggedIn: true});
        })
        .catch(err =>{
            res.status(202).json({error: "Impossible de créer une ssession"});
        })
    }catch (err){
        const error = new HttpError(
            "Impossible de créer une session",
            500
            );
            return next(error);
        }
}

const updateSession = async (req, res, next) => {

    let sessionCreated;

    sessionCreated = await db.getDb().collection('sessions').find()

    if(sessionCreated){
        db.getDb()
        .collection('sessions')
        .drop()
    
        try{
            db.getDb()
            .collection('sessions')
            .insertOne({createdAt: new Date})
            .then(res => {
                res.status(201).json({message: "Session prolongée"});
            }) 
        }catch (err){
            const error = new HttpError(
                "Impossible de prolonger une session",
                500
                );
                return next(error);
            }
    }else{
        res.status(202).json({isLoggedIn: false});
    }

}

const deleteSession = async (req, res, next) => {

    db.getDb()
    .collection('sessions')
    .drop()
    .then(res => {
        res.status(202).json({isLoggedIn: false});
    })
    .catch(err => {
        res.status(500).json({error: "Impossible de supprimer la session"});
    }) 
}

exports.deleteSession = deleteSession;
exports.createSession = createSession;
exports.updateSession = updateSession;