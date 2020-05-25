const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({

    imageName: {
        type: String,
        required:true,
        trim:true
    },
    deleteStatus: {
        type:Boolean,
        default:false
    },
    description: {
        type: String,
    },
    uploadedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    sharedBy: {
        type: mongoose.Types.ObjectId
    },
    photo: {
        type: String
    }
},{
    timestamps: true
})

const Image = mongoose.model('Image',imageSchema)

module.exports = Image