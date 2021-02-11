const express = require("express");
const router = express.Router();

const createNewPoste = require("../controllers/reservations/creation/createReservation");
// const getAllPostes = require("../controllers/reservations/affichage/getResaByDate");
const updateResa = require("../controllers/reservations/modification/updateReservation");
const deleteResa = require("../controllers/reservations/suppression/deleteReservation");
const getReservation = require("../controllers/reservations/affichage/getReservations");

router.post("/create/:posteId/:userId", createNewPoste.createNewResa);

router.get("/", getReservation.getReservation);
router.get("/dateselected", getReservation.getReservationByDate);
router.get("/:resaId", getReservation.getReservationById);
// router.get("/:posteId/:resaId", getReservation.getReservationByDateByPoste);


router.patch("/:resaId", updateResa.updateResa);

router.delete("/:resaId", deleteResa.deleteResa);

module.exports = router;