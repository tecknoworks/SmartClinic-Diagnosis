const mongoose = require('mongoose');
const Diagnosis = require('./Diagnosis')

const PrescriptionSchema = new mongoose.Schema(
    {
        intructions: {
            type: String,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        },
        diagnosis: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Diagnosis'
        },
        drugId: {
            type: String,
            require: true
        }
    }
)

mongoose.set('useFindAndModify', false);
const Prescription = mongoose.model('Prescription', PrescriptionSchema)
module.exports = Prescription