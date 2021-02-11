const express = require("express");
const router = express.Router();

const createNewPoste = require("../controllers/postes/creation/createPoste");
const getAllPostes = require("../controllers/postes/affichage/getAllPostes");
const updatePoste = require("../controllers/postes/modification/updatePoste");
const deletePoste = require("../controllers/postes/suppression/deletePoste");

router.post("/create", createNewPoste.createNewPoste);

router.get("/", getAllPostes.getAllPostes);

router.patch("/:posteId", updatePoste.updatePoste);

router.delete("/:posteId", deletePoste.deletePoste);

module.exports = router;