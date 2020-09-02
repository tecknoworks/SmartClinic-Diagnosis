var express = require("express");
var router = express.Router();
const PrescriptionService = require('../services/PrescriptionService');

router.get("/", PrescriptionService.get)
router.get("/:id", PrescriptionService.getById)
router.get("/getByDiagnosisId/:id", PrescriptionService.findByDiagnosisId)

router.put("/update/:id", PrescriptionService.update)

module.exports = router