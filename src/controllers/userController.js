import Admins from "../models/admin";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();
    if (!admins.length) {
      return res.status(404).json({
        message: "No es administrador!",
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: "Administrador encontrado!",
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, tipo_usuario } = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const passwordEncrypt = await bcrypt.hashSync(password, salt);
    const createdAdmin = await Admins.create({
      firstName,
      lastName,
      email,
      password: passwordEncrypt,
      tipo_usuario,
    });
    if (!createdAdmin) {
      return res.status(400).json({
        message: "El usuario no se pudo crear",
        data: {},
        error: true,
      });
    }
    return res.status(201).json({
      message: "Usuario creado correctamente",
      data: createdAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, tipo_usuario } = req.body;

  try {
    const existingUser = await Admins.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        message: 'El usuario no fue encontrado',
        data: {},
        error: true,
      });
    }

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.email = email;
    existingUser.tipo_usuario = tipo_usuario;

    if (password) {
      const salt = await bcrypt.genSaltSync(10);
      const passwordEncrypt = await bcrypt.hashSync(password, salt);
      existingUser.password = passwordEncrypt;
    }

    const updatedUser = await existingUser.save();

    res.status(200).json({
      message: 'Usuario actualizado correctamente',
      data: updatedUser,
      error: false,
    });
  } catch (error) {
    console.error('Error en el proceso de actualización:', error.message);
    res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admins.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: 'Email y/o contraseña incorrecta/s',
      });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(404).json({
        error: 'Email y/o contraseña incorrecta/s',
      });
    }

    const token = jwt.sign(
      {
        nombre: user.firstName,
        apellido: user.lastName,
        email: user.email,
        id: user._id.toString(),
        tipo_usuario: user.tipo_usuario,
      },
      process.env.TOKEN_SECRET,
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error('Error en el proceso de login:', error.message);
    res.status(500).json({
      error: 'Hubo un error interno en el servidor',
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Admins.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'El usuario no fue encontrado' });
    }

    res.json({ mensaje: 'El usuario ha sido eliminado correctamente' });
  } catch (error) {
    console.error('Error en el proceso de eliminación:', error.message);
    res.status(500).json({ error: 'Hubo un error interno en el servidor' });
  }
};
