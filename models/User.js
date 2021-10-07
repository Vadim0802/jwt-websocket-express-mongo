import mongoose from 'mongoose';

const User = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  coords: {
    default: { x: "0px", y: "0px" },
    type: Object,
  }
});

const userModel = mongoose.model('User', User);

export default userModel;