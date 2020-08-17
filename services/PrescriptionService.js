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

let insertPrescription = async (req, res, next) => {
    await PrescriptionRepository.create(req.body)
        .then(
            prescription => {
                res.json(prescription)
            }
        )
        .catch(err => next(err))
}

let deletePrescription = async (req, res, next) => {
    await PrescriptionRepository.remove(req.params.id)
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
    await PrescriptionRepository.update(req.params.id, { ...req.body })
        .then(
            prescription => {
                res.json(prescription)
            }
        )
        .catch(err => next(err))
}

module.exports = { get, insertPrescription, deletePrescription, update, getById, findByDiagnosisId }