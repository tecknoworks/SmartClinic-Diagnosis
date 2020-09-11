var mongoose = require('mongoose');
const Prescription = require('./Prescription')

const DiagnosisSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        appointment: {
            type: String,
            require: true
        },
        prescription: [{type: mongoose.Schema.Types.ObjectId, ref: 'Prescription'}]
    }
)

DiagnosisSchema.pre('findOneAndRemove', function(next){
    Prescription.deleteMany({diagnosis: this._conditions._id}).exec()
    next()
})

const Diagnosis = mongoose.model('Diagnosis', DiagnosisSchema)   
module.exports = Diagnosis