var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');


// user API
router.post('/', UserController.add);

module.exports = router;
