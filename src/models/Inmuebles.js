import mongoose, { Schema } from "mongoose";

const InmuebleSchema = new Schema({
  tipo_operacion: {
    type: String,
    required: true,
  },
  tipo_inmueble: {
    type: String,
    required: true,
  },
  banio: {
    type: String,
  },
  dormitorio: {
    type: String,
  },
  m2_terreno: {
    type: String,
  },
  m2_edificado: {
    type: String,
  },
  ciudad: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: String,
    required: true,
  },
  garantia: {
    type: String,
  },
  departamento: {
    type: String,
    required: true,
  },
  barrio: {
    type: String,
  },
  direccion: {
    type: String,
    required: true,
  },
  images: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

export default mongoose.model("Inmueble", InmuebleSchema);
