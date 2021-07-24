const mongoose = require('mongoose')

exports.isValidObjectId = (id) => {
    let isValid = mongoose.Types.ObjectId.isValid(id)
    return isValid
}