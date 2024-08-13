const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    }
});
userSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    } else {
        return next();
    }
});
const userModel=mongoose.model("users",userSchema);
module.exports=userModel;