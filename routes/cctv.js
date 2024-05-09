var express = require('express');
var router = express.Router();
const CctvController = require('../controllers/CctvController');
const { authenticate, isAdmin } = require('../middlewares');

// authenticate
router.use(authenticate);

// cctv API (only admin can perform this tasks)
router.post('/', isAdmin, CctvController.add);
router.patch('/:id', isAdmin, CctvController.update);
router.delete('/:id', isAdmin, CctvController.delete);

// cctv API (all authenticated user)
router.get('/', CctvController.findAll);
router.get('/:id', CctvController.findOne);

module.exports = router;
