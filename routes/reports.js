var express = require('express');
var router = express.Router();
const ReportController = require('../controllers/ReportController');
const { authenticate, isReportOwner } = require('../middlewares');

router.use(authenticate);

// create new report
router.post('/:cctvId', ReportController.add);
// find specific report details
router.get('/:id', ReportController.findOne);

// find all reports with filters on specific CCTV
router.get('/all/:cctvId', ReportController.findReportsByCctv);

// edit delete report need to confirm owner
router.patch('/:id', isReportOwner, ReportController.update);
router.delete('/:id', isReportOwner, ReportController.delete);
module.exports = router;