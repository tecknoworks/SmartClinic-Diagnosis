const Diagnosis = require('../models/Diagnosis')
const Repository = require('./Repository')

class DiagnosisRepository extends Repository {
    constructor(model) {
        super(model)
    }

    async findByAppointmentId(appointmentId){
        return await this.model.find({appointmentId: appointmentId}).exec()
    }

    async update(id, diagnosisParam){
        const diagnosis = await this.model.findById(id)

        Object.assign(diagnosis, diagnosisParam)

        const updatedDiagnosis = await diagnosis.save()
        return updatedDiagnosis
    }
}

var diagnosisRepository = new DiagnosisRepository(Diagnosis);
module.exports = diagnosisRepository;