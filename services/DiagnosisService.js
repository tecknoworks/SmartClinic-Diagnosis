const DiagnosisRepository = require('../repositories/DiagnosisRepository');

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
    await DiagnosisRepository.findByAppointmentId(req.params.id)
        .then(
            diagnosis => {
                res.json(diagnosis)
            }
        )
        .catch(err => next(err))
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

module.exports = { get, insertDiagnosis, deleteDiagnosis, findByAppointmentId, update, getById }