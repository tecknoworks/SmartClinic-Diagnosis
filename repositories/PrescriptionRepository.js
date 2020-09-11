const Prescription = require('../models/Prescription')
const Repository = require('./Repository')

class PrescriptionRepository extends Repository {
    constructor(model) {
        super(model)
    }

    async findByDiagnosisId(id){
        return await this.model.find({diagnosis: id}).exec()
    }

    async updateDrugPrescritpion(id, data){
        const drugPrescription = await this.model.findById(id);
        if(!drugPrescription) throw new Error("Drug not found in prescription!");

        Object.assign(drugPrescription,data);

        const newDrug = await drugPrescription.save();
        return newDrug;
    }
}

var prescriptionRepository = new PrescriptionRepository(Prescription);
module.exports = prescriptionRepository;