var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticate, isSuperAdmin } = require('../middlewares');


// logi API
router.post('/login', UserController.login);

// middlewares
router.use(authenticate);

// CRUD user API (need superadmin role)
router.post('/', isSuperAdmin, UserController.add);
router.get('/', isSuperAdmin, UserController.findAll);
router.delete('/:id', isSuperAdmin, UserController.delete);
router.patch('/:id', isSuperAdmin, UserController.update);
module.exports = router;
