import Joi from "joi";

const userSchema = Joi.object({
  tipo_operacion: Joi.string().min(4).max(10).messages({
    "string.base": "El tipo de operación debe ser una cadena",
    "string.empty": "El tipo de operación no puede estar vacío",
    "string.min":
      "El tipo de operación debe tener al menos {#limit} caracteres",
    "string.max":
      "El tipo de operación debe tener como máximo {#limit} caracteres",
  }),
  tipo_inmueble: Joi.string().min(4).max(10).messages({
    "string.base": "El tipo de inmueble debe ser una cadena",
    "string.empty": "El tipo de inmueble no puede estar vacío",
    "string.min": "El tipo de inmueble debe tener al menos {#limit} caracteres",
    "string.max":
      "El tipo de inmueble debe tener como máximo {#limit} caracteres",
  }),
  banio: Joi.number().integer().min(1).max(99).messages({
    "number.base": "Solo se aceptan números",
    "number.integer": "El número de baños debe ser un entero",
    "number.min": "El número de baños debe ser como mínimo {#limit}",
    "number.max": "El número de baños debe ser como máximo {#limit}",
  }),
  m2_terreno: Joi.number().min(10).max(9999).positive().messages({
    "number.base": "El valor de m2 de terreno debe ser un número",
    "number.positive": "El valor de m2 de terreno debe ser un número positivo",
  }),
  m2_edificado: Joi.number().min(10).max(9999).positive().messages({
    "number.base": "El valor de m2 edificado debe ser un número",
    "number.positive": "El valor de m2 edificado debe ser un número positivo",
  }),
  ciudad: Joi.string().min(4).max(50).messages({
    "string.base": "La ciudad debe ser una cadena",
    "string.empty": "La ciudad no puede estar vacía",
    "string.min": "La ciudad debe tener al menos {#limit} caracteres",
    "string.max": "La ciudad debe tener como máximo {#limit} caracteres",
  }),
  dormitorio: Joi.number().integer().min(1).max(99).messages({
    "number.base": "Solo se aceptan números",
    "number.integer": "El número de dormitorios debe ser un entero",
    "number.min": "El número de dormitorios debe ser como mínimo {#limit}",
    "number.max": "El número de dormitorios debe ser como máximo {#limit}",
  }),
  descripcion: Joi.string().min(10).max(200).messages({
    "string.base": "La descripción solo acepta letras",
    "string.min": "La descripción debe tener al menos {#limit} caracteres",
    "string.max": "La descripción debe tener como máximo {#limit} caracteres",
  }),
  precio: Joi.number().positive().messages({
    "number.base": "El precio debe ser un número",
    "number.empty": "El precio no puede estar vacío",
    "number.positive": "El precio debe ser un número positivo",
  }),
  garantia: Joi.string().min(4).max(50).messages({
    "string.base": "La garantía solo acepta letras",
    "string.empty": "La garantía no puede estar vacía",
    "string.min": "La garantía debe tener al menos {#limit} caracteres",
    "string.max": "La garantía debe tener como máximo {#limit} caracteres",
    "any.required": "El campo garantía es obligatorio",
  }),
  departamento: Joi.string().min(4).max(50).messages({
    "string.base": "El departamento solo acepta letras",
    "string.empty": "El departamento no puede estar vacío",
    "string.min": "El departamento debe tener al menos {#limit} caracteres",
    "string.max": "El departamento debe tener como máximo {#limit} caracteres",
    "any.required": "El campo departamento es obligatorio",
  }),
  moneda: Joi.string().messages({
    "string.base": "El campo moneda solo acepta letras",
    "string.empty": "El campo moneda no puede estar vacío",
    "any.required": "El campo moneda es obligatorio",
  }),
  barrio: Joi.string().min(4).max(50).messages({
    "string.base": "El barrio solo acepta letras",
    "string.min": "El barrio debe tener al menos {#limit} caracteres",
    "string.max": "El barrio debe tener como máximo {#limit} caracteres",
  }),
  direccion: Joi.string().min(10).max(200).messages({
    "string.base": "La dirección solo acepta letras",
    "string.empty": "La dirección no puede estar vacía",
    "string.min": "La dirección debe tener al menos {#limit} caracteres",
    "string.max": "La dirección debe tener como máximo {#limit} caracteres",
  }),
  images: Joi.array()
    .items(
      Joi.string()
        .pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/),
    )

    .messages({
      "any.required": "Debes proporcionar al menos una imagen",
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
