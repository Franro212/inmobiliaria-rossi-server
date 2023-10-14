import Joi from "joi";

const userSchema = Joi.object({
  tipo_operacion: Joi.string().messages({
    "string.base": "Este campo solo acepta letras",
    "any.required": "Este campo es requerido",
  }),
  tipo_inmueble: Joi.string().messages({
    "string.base": "Este campo solo acepta letras",
    "any.required": "Este campo es requerido",
  }),
  banio: Joi.number().integer().min(1).max(99).messages({
    "number.base": "Este campo solo acepta números",
    "number.integer": "Este campo solo acepta números enteros",
    "number.min": "Debe ingresar como mínimo {#limit}",
    "number.max": "El maximo permitido es {#limit}",
  }),
  m2_terreno: Joi.number().positive().messages({
    "number.base": "Este campo solo acepta números",
    "number.positive": "Debe ingresar un valor positivo",
  }),
  m2_edificado: Joi.number().min(10).max(9999).positive().messages({
    "number.base": "Este campo solo acepta números",
    "number.positive": "Debe ingresar un valor positivo",
  }),
  ciudad: Joi.string().min(4).max(50).messages({
    "string.base": "Este campo solo acepta letras",
    "any.required": "Este campo es requerido",
    "string.min": "Debe tener al menos {#limit} caracteres",
    "string.max": "Debe tener como máximo {#limit} caracteres",
  }),
  dormitorio: Joi.number().integer().min(1).max(99).messages({
    "number.base": "Este campo solo acepta números",
    "number.integer": "Este campo solo acepta números enteros",
    "number.min": "Debe ingresar como mínimo {#limit}",
    "number.max": "El maximo permitido es {#limit}",
  }),

  precio: Joi.number().positive().messages({
    "number.base": "Este campo solo acepta números",
    "any.required": "Este campo es requerido",
    "number.positive": "Debe ingresar un valor positivo",
  }),
  garantia: Joi.string().min(4).max(50).messages({
    "string.base": "Este campo solo acepta letras",
    "string.min": "Debe ingresar como mínimo {#limit} caracteres",
    "string.max": "El maximo permitido es {#limit} caracteres",
  }),
  departamento: Joi.string().min(4).max(50).messages({
    "any.required": "Este campo es requerido",
    "string.base": "Este campo solo acepta letras",
    "string.min": "Debe ingresar como mínimo {#limit} caracteres",
    "string.max": "El maximo permitido es {#limit} caracteres",
  }),
  moneda: Joi.string().messages({
    "string.base": "Este campo solo acepta letras",
    "any.required": "Este campo es requerido",
  }),
  barrio: Joi.string().min(4).max(50).messages({
    "string.base": "Este campo solo acepta letras",
    "any.required": "Este campo es requerido",
    "string.min": "Debe ingresar como mínimo {#limit} caracteres",
    "string.max": "El maximo permitido es {#limit} caracteres",
  }),
  direccion: Joi.string().min(10).max(200).messages({
    "any.required": "Este campo es requerido",
    "string.min": "Debe ingresar como mínimo {#limit} caracteres",
    "string.max": "El maximo permitido es {#limit} caracteres",
  }),
  images: Joi.array()
    .items(Joi.string().pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/))

    .messages({
      "any.required": "Este campo es requerido",
      "string.pattern.base":
        "Las imágenes deben tener un formato correcto (jpg, jpeg, png o gif)",
    }),
});

const validateInmuebles = (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: true });
    if (!error) {
      return next();
    }

    const validationErrors = error.details.map((err) => err.message);
    return res.status(400).json({
      message: "Hubo errores de validación en los datos del inmueble",
      data: null,
      errors: validationErrors,
    });
  } catch (err) {
    console.error("Error en la validación del inmueble:", err);
    return res.status(500).json({
      message: "Hubo un error interno en el servidor",
      data: null,
      error: true,
    });
  }
};
export default validateInmuebles;
