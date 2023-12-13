import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const compareSync = bcrypt.compareSync
const hashSync = bcrypt.hashSync

const UserSchema = new mongoose.Schema(
  {
    /* username: {
        type: String,
        validate: {
            validator: username => User.doesNotExist({ username }),
            message: "Username already exists"
        }
    }, */
    email: {
      type: String,
      validate: {
        validator: (email) => User.doesNotExist({ email }),
        message: 'Email already exists',
      },
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    /*age: {
        type: Number,
        required: true,
    }, */
    role: {
      type: String,
      enum: ['visitor', 'registrant', 'subscriber', 'admin'],
      default: 'visitor',
    },
    isActive: {
      type: Boolean,
      default: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true },
)

UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = hashSync(this.password, 10)
  }
})

UserSchema.pre('findOneAndUpdate', function () {
  if (this._update.$set && this._update.$set.password) {
    this._update.$set.password = hashSync(this._update.$set.password, 10)
  }
})

UserSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0
}

UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password)
}

const User = mongoose.model('User', UserSchema)
export default User
