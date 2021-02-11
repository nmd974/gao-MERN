const express = require("express");
const router = express.Router();

const createUser = require("../controllers/users/creation/createUser");
const signup = require("../controllers/users/creation/signup");
const login = require("../controllers/users/connexion/login");
const deleteUser = require("../controllers/users/suppression/deleteUser");
const updateUser = require("../controllers/users/modification/updateUser");
const getUsers = require("../controllers/users/affichage/getUsers");


router.get('/', getUsers.getUsersAll);
router.get('/:userId', getUsers.getUsersById);

router.post('/signup', signup.signup);
router.post('/create', createUser.createUser);
router.post('/login', login.login);

router.patch('/:userId', updateUser.updateUser);

router.delete('/:userId', deleteUser.deleteUser);

module.exports = router;