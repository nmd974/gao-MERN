const express = require("express");
const router = express.Router();

const session = require("../controllers/session/sessionManager");

router.get('/', session.updateSession);
router.post('/', session.createSession);
router.delete('/', session.deleteSession);

module.exports = router;