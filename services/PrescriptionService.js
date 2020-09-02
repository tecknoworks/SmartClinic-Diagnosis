const PrescriptionRepository = require('../repositories/PrescriptionRepository');

let get = async (req, res, next) => {
    await PrescriptionRepository.get()
        .then(
            prescription => {
                res.json(prescription)
            }
        )
        .catch(err => next(err))
}

let getById = async (req, res, next) => {
    await PrescriptionRepository.findById(req.params.id)
        .then(
            prescription => {
                res.json(prescription)
            }
        )
        .catch(err => next(err))
}

let findByDiagnosisId = async (req, res) => {
    await PrescriptionRepository.findByDiagnosisId(req.params.id)
        .then(
            prescription => {
                res.json(prescription)
            }
        )
        .catch(err => next(err))
}

let update = async (req, res) => {
    await PrescriptionRepository.updateDrugPrescritpion(req.params.id, { ...req.body })
        .then(
            prescription => {
                res.json(prescription)
            }
        )
        .catch(err => next(err))
}

module.exports = { get, update, getById, findByDiagnosisId }