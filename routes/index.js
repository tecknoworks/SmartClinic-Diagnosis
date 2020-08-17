var express = require('express');
var router = express.Router();

const diagnosisRouter = require('./diagnosis');
const prescriptionRouter = require('./prescription')

router.use('/prescription', prescriptionRouter)
router.use('/diagnosis', diagnosisRouter);

module.exports = router;
