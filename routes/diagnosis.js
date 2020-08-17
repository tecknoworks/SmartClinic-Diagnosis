var express = require("express");
var router = express.Router();
const DiagnosisService = require('../services/DiagnosisService')

router.get("/:id", DiagnosisService.getById)
router.get("/", DiagnosisService.get)
router.post("/insert", DiagnosisService.insertDiagnosis)
router.delete("/delete/:id", DiagnosisService.deleteDiagnosis)
router.get("/getByAppointmentId/:id", DiagnosisService.findByAppointmentId)
router.put("/update/:id", DiagnosisService.update)

module.exports = router