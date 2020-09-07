const DiagnosisRepository = require('../repositories/DiagnosisRepository');
const PrescriptionRepository = require('../repositories/PrescriptionRepository');
const { findAsync } = require('../utils');

let get = async (req, res, next) => {
    await DiagnosisRepository.get()
        .then(
            diagnosis => {
                res.json(diagnosis)
            }
        )
        .catch(err => next(err))
}

let getById = async (req, res, next) => {
    await DiagnosisRepository.findById(req.params.id)
        .then(
            diagnosis => {
                res.json(diagnosis)
            }
        )
        .catch(err => next(err))
}

let insertDiagnosis = async (req, res, next) => {
    await DiagnosisRepository.create(req.body)
        .then(
            diagnosis => {
                res.json(diagnosis)
            }
        )
        .catch(err => next(err))
}

let deleteDiagnosis = async (req, res, next) => {
    await DiagnosisRepository.remove(req.params.id)
        .then(
            diagnosis => {
                res.json(diagnosis)
            }
        )
        .catch(err => next(err))
}

let findByAppointmentId = async (req, res) => {
    let id = req.params.id;
    let diagnosis = await DiagnosisRepository.findByAppointmentId(id);

    res.json(diagnosis[0]);
}

let update = async (req, res) => {
    await DiagnosisRepository.update(req.params.id, { ...req.body })
        .then(
            diagnosis => {
                res.json(diagnosis)
            }
        )
        .catch(err => next(err))
}

let addDrugToPrescription = async (req, res) => {
    let data = { ...req.body };

    let instrunctions = data.instrunctions;
    let quantity = data.quantity;
    let diagnosisId = data.diagnosis;
    let drugId = data.drug;

    //validate
    let diagnosis = await DiagnosisRepository.findById(diagnosisId);
    if (!diagnosis) throw new Error("Diagnosis not found!");

    let isPresent = await findAsync(diagnosis.prescription, async (drugPres) => {
        let drugPrescription = await PrescriptionRepository.findById(drugPres);
        return drugPrescription.drug == drugId;
    })

    let drugPrescription;
    let newPrescription;
    if (!isPresent) {//if is not present, we want to create one

        drugPrescription = await PrescriptionRepository.create({
            quantity: quantity,
            drug: drugId,
            diagnosis: diagnosisId,
            instrunctions: instrunctions
        });
        newPrescription = await DiagnosisRepository.addDrugPrescription(diagnosisId, drugPrescription.id);

    } else {//if is present, we want to update the qauntity
        existingDrugPrescription = await PrescriptionRepository.findById(isPresent);
        let newQuantity = existingDrugPrescription.quantity + quantity;
        drugPrescription = await PrescriptionRepository.updateDrugPrescritpion(existingDrugPrescription.id, { quantity: newQuantity });
        newPrescription = diagnosis;
    }

    res.json({ diagnosis: newPrescription, drug: drugPrescription });
}

let deleteDrugPrescription = async (req, res) => {
    const diagnosisId = req.params.diagnosis;
    const drugPrescriptionId = req.params.drugPrescription;

    let diagnosis = await DiagnosisRepository.findById(diagnosisId);
    if (!diagnosis) throw new Error("Diagnosis not found!");

    let drugPrescription = await PrescriptionRepository.findById(drugPrescriptionId);
    if (!drugPrescription) throw new Error("Drug Prescription not found!");

    let newDiagnosis = await DiagnosisRepository.removeDrugPrescription(diagnosisId, drugPrescriptionId);
    res.json(newDiagnosis);
}

module.exports = { get, insertDiagnosis, deleteDiagnosis, findByAppointmentId, update,
    deleteDrugPrescription, getById, addDrugToPrescription }