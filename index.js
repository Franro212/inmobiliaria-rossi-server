import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app";

dotenv.config();

mongoose
  .connect(process.env.DB_URL, {
    maxPoolSize: process.env.MONGO_POOLSIZE || 1,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");

    try {
      app.listen(process.env.PORT, (err) => {
        if (err) throw err;
        // eslint-disable-next-line no-console
        console.log(`Servidor listo en el puerto: ${process.env.PORT}`);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("Hay un error al iniciar el servidor: ", err);
    }
  })
  // eslint-disable-next-line no-console
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
