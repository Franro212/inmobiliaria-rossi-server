import mongoose from "mongoose";
import Inmuebles from "../models/Inmuebles";



export const getInmuebles = async (req, res) => {
  try {
    const inmuebles = await Inmuebles.find();
    return res.status(200).json({
      success: true,
      message: "Lista de Inmuebles",
      data: inmuebles,
    });
  } catch (error) {
    console.error("Error al obtener los inmuebles:", error);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al obtener los inmuebles",
      error: error.message,
    });
  }
};

export const getInmuebleByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "ID Inválido",
    });
  }

  try {
    const inmueble = await Inmuebles.findById(id);

    if (!inmueble) {
      return res.status(404).json({
        success: false,
        message: "Inmueble no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inmueble encontrado",
      data: inmueble,
    });
  } catch (error) {
    console.error("Error al obtener el inmueble:", error);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al obtener el inmueble",
      error: error.message,
    });
  }
};

export const createInmueble = async (req, res) => {
  const {
    tipo_operacion,
    tipo_inmueble,
    dormitorio,
    banio,
    m2_terreno,
    m2_edificado,
    ciudad,
    descripcion,
    precio,
    garantia,
    departamento,
    barrio,
    direccion,
  } = req.body;
  const { buffer, mimetype } = req.file;

  try {
    const newInmueble = await Inmuebles.create({
      tipo_operacion,
      tipo_inmueble,
      dormitorio,
      banio,
      m2_terreno,
      m2_edificado,
      ciudad,
      descripcion,
      precio,
      garantia,
      departamento,
      barrio,
      direccion,
      images: [
        {
          data: buffer,
          contentType: mimetype,
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "El inmueble se creó correctamente",
      data: newInmueble,
    });
  } catch (error) {
    console.error("Error al crear el inmueble:", error);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al crear el inmueble",
      error: error.message,
    });
  }
};

export const updateInmueble = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "ID Inválido",
    });
  }

  try {
    const inmueble = await Inmuebles.findById(id);

    if (!inmueble) {
      return res.status(404).json({
        success: false,
        message: "Inmueble no encontrado",
      });
    }

    const {
      tipo_operacion,
      tipo_inmueble,
      dormitorio,
      banio,
      m2_terreno,
      m2_edificado,
      ciudad,
      descripcion,
      precio,
      garantia,
      departamento,
      barrio,
      direccion,
    } = req.body;

    const updatedInmueble = {
      tipo_operacion: tipo_operacion || inmueble.tipo_operacion,
      tipo_inmueble: tipo_inmueble || inmueble.tipo_inmueble,
      dormitorio: dormitorio || inmueble.dormitorio,
      banio: banio || inmueble.banio,
      m2_terreno: m2_terreno || inmueble.m2_terreno,
      m2_edificado: m2_edificado || inmueble.m2_edificado,
      ciudad: ciudad || inmueble.ciudad,
      descripcion: descripcion || inmueble.descripcion,
      precio: precio || inmueble.precio,
      garantia: garantia || inmueble.garantia,
      departamento: departamento || inmueble.departamento,
      barrio: barrio || inmueble.barrio,
      direccion: direccion || inmueble.direccion,
    };

    let hasChanges = false;

    for (let key in updatedInmueble) {
      if (updatedInmueble[key] !== inmueble[key]) {
        hasChanges = true;
        break;
      }
    }

    if (!hasChanges) {
      return res.status(400).json({
        success: false,
        message: "No se hicieron cambios en el inmueble",
      });
    }

    const result = await Inmuebles.findByIdAndUpdate(id, updatedInmueble, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Inmueble editado correctamente",
      data: result,
    });
  } catch (error) {
    console.error("Error al editar el inmueble:", error);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al editar el inmueble",
      error: error.message,
    });
  }
};

export const deleteInmueble = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "ID Inválido",
    });
  }

  try {
    const deletedInmueble = await Inmuebles.findByIdAndDelete(id);

    if (!deletedInmueble) {
      return res.status(404).json({
        success: false,
        message: "Inmueble no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inmueble eliminado correctamente",
      data: deletedInmueble,
    });
  } catch (error) {
    console.error("Error al eliminar el inmueble:", error);
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al eliminar el inmueble",
      error: error.message,
    });
  }
};

