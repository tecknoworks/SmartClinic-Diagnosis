const Prescription = require('../models/Prescription')
const Repository = require('./Repository')

class PrescriptionRepository extends Repository {
    constructor(model) {
        super(model)
    }

    async findByDiagnosisId(diagnosisId){
        return await this.model.find({diagnosisId: diagnosisId}).exec()
    }
}

var prescriptionRepository = new PrescriptionRepository(Prescription);
module.exports = prescriptionRepository;