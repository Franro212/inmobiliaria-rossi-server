export const verifyPerfil = (req, res, next) => {
  const user = req.user;
  if (user.tipo_usuario === "Admin") {
    next();
  } else {
    res.status(401).json({ error: "Acceso al recurso denegado" });
    return;
  }
};

 export const verifyPerfil2 = (req, res, next) => {
  const user = req.user;
  if (user.tipo_usuario === "Comun") {
    next();
  } else {
    res.status(401).json({ error: "Acceso al recurso denegado" });
    return;
  }
};

