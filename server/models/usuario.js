const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'The name is necessary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is necessary']
    },
    password: {
        type: String,
        required: [true, 'Password is necessary']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function () {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
module.exports = mongoose.model('Usuario', usuarioSchema);