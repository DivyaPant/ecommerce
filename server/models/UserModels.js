const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    line1: {type: String, required: true},
    line2: {type: String},
    city: {type: String},
    state: {type: String, required: true},
    zip: {type: Number, required: true},
    country: {type: String, required: true}
})

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    displayName: {type: String},
    email: {type: String, required: true, unique: true},
    address: {type: [AddressSchema], default: [] } //embed
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;