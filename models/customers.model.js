const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true, 
            match: [/\S+@\S+\.\S+/, 'Invalid email address'], 
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            match: [/^\d{10}$/, 'Phone number must be 10 digits'], 
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        video: {
            type: String,
            required: true,
        },
        terms: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);









const User = mongoose.model('User', userSchema);

module.exports = User;
