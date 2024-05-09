var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticate, isAdmin } = require('../middlewares');


// user API
router.post('/login', UserController.login);

// middlewares
router.use(authenticate);

router.post('/', isAdmin, UserController.add);
module.exports = router;
