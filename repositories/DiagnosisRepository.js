const Diagnosis = require('../models/Diagnosis')
const Repository = require('./Repository')
const Prescription = require('../models/Prescription')
const {asyncFilter} = require('../utils');

class DiagnosisRepository extends Repository {
    constructor(model) {
        super(model)
    }

    async findByAppointmentId(appointmentId) {
        return await this.model.find({ appointmentId: appointmentId }).exec()
    }

    async update(id, diagnosisParam) {
        const diagnosis = await this.model.findById(id)

        Object.assign(diagnosis, diagnosisParam)

        const updatedDiagnosis = await diagnosis.save()
        return updatedDiagnosis
    }

    async addDrugPrescription(diagnosis, drugPrescription) {
        return await this.model.findByIdAndUpdate(diagnosis, { $push: { prescription: drugPrescription } }, { new: true, useFindAndModify: false });
    }

    async removeDrugPrescription(diagnosisId, drugPrescriptionId) {
        const drugPrescription = await Prescription.findByIdAndRemove(drugPrescriptionId);
        const diagnosis = await this.model.findById(diagnosisId);

        const drugPrescriptions = await asyncFilter(diagnosis.prescription, async(drug) => {
                                            return drug != drugPrescriptionId
                                        });
        console.log(drugPrescriptions);

        diagnosis.prescription = drugPrescriptions;
        console.log(diagnosis.prescription);

        const newDiagnosis = await diagnosis.save();

        return newDiagnosis;
    }
}

var diagnosisRepository = new DiagnosisRepository(Diagnosis);
module.exports = diagnosisRepository;