const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Group = require('./Group')
const salt = bcrypt.genSaltSync(10)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Email is invalid')
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain "password"')
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, salt, null);
};

userSchema.methods.validPassword = function(password) {
    console.log(password, this.password)
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Unable to login')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Unable to login')
    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 8)
    next()
})

// Delete user groups when user is removed
userSchema.pre('remove', async function(next) {
    await Group.deleteMany({ creator: this._id })
    let groups = await Group.find({ "users.id": this._id })
    groups.map(group => {
        group.users.pop(this._id)
        group.save()
    })

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User