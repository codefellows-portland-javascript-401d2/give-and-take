const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username : {
    type: String,
    required: true
  },
  password : {
    type: String,
    required: true
  },
  admin : {
    type: Boolean,
    default: false
  },
  firstname : {
    type: String
  },
  lastname: {
    type: String
  },
  gender : {
    type: String,
    enum: ['male', 'female', 'other']
  },
  profileImage: {
    type: String
  },
  sessionsGiven : {
    type: Number,
    default: 0
  },
  sessionsTaken : {
    type: Number,
    default: 0
  },
  zip: {
    type: String
  },
  skills: [{
    type: Schema.Types.ObjectId,
    ref: 'SubTopic'
  }]
}, {
  timestamps: true
});

userSchema.methods.makeHash = function (pw) {
  return this.password = bcrypt.hashSync(pw);
};

userSchema.methods.checkHash = function (pw) {
  return bcrypt.compareSync(pw, this.password);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
