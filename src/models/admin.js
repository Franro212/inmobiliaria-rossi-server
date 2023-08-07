import mongoose, { Schema } from "mongoose";

const InmuebleSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 10,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
  },
  tipo_usuario:{
    type: String,
    required: true,
  },
});

export default mongoose.model("Admins", InmuebleSchema);
