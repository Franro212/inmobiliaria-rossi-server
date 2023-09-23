const nodemailer = require("nodemailer");

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "rossifranco748@gmail.com",
      pass: process.env.EMAIL_TOKEN,
    },
  });

  const mailOptions = {
    from: "rossifranco748@gmail.com",
    to: "rossifranco748@gmail.com",
    subject: "Mensaje de contacto desde tu sitio web",
    text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente");
    res.status(200).send("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send("Error al enviar el correo");
  }
};
