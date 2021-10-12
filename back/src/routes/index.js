const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Ruta de Registro
router.post("/send-email", async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER, // generated ethereal user
      pass: process.env.MAILER_PASS, // generated ethereal password, guardar en una .env
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "Tejon Admin  <henrydevjobs@gmail.com>",
    to: `${email}`,
    subject: "Registro",
    text: "¡Felicidades, acabas de registrarte con exito en nuestra pagina!",
  });

  console.log("message sent so", info.messageId);
});

//Ruta para contacto
router.post("/contact", async (req, res) => {
  console.log(req.body)
  const { email, fullName, contact } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER, // generated ethereal user
      pass: process.env.MAILER_PASS, // generated ethereal password, guardar en una .env
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  contentHtml = `
  <h1>Felicitaciones, lo han contactaoh!</h1>

  <p>Hola! mi nombre es ${fullName}, 
    Estamos interesados en su perfil laboral, le dejo mi email ${contact}
    Comuniquese a la brevedad con nosotros </p>
  
`;

  const info = await transporter.sendMail({
    from: "Tejon Admin <henrydevjobs@gmail.com>",
    to: `${email}`,
    subject: "Contacto recibido",
    html: contentHtml,
  });

  console.log("message sent so", info.messageId);

  res.json({
    message: "email send",
  });
});

//Ruta para resetear Password del Alumno
router.post("/sendResetAlumno", async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  contentHtml = `
        <h1>User information</h1>
        <ul>
            <li>User email: ${email}</li>
        </ul>
        <p>Usted ha solicitado la recuperacion de su contraseña, haga click en el sigiuente link para recuperarla:
        <a href='http://${process.env.APP_URL}${process.env.APP_PORT}/resetPasswordAlumno/${token}'>AQUI</a>
        </br>Si no solicito la recuperacion de constraseña ignore este mail.</p>
    `;
  //esta es la estructura que se va a enviar por correo
  console.log(contentHtml);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER, // generated ethereal user
      pass: process.env.MAILER_PASS, // generated ethereal password, guardar en una .env
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "Tejon Admin <henrydevjobs@gmail.com>",
    to: `${email}`,
    subject: "Recuperar contraseña",
    html: contentHtml,
  });

  res.json({
    message: "email sent",
  });
});

//Ruta para Aply
router.post("/apply-form", async (req, res) => {
  console.log(req.body)
  const { email, phone, fullName, contact } = req.body;

  contentHtml = `
  <h1>User information</h1>

  <p>Hola! mi nombre es ${fullName}, 
    Estoy interesado en su oferta laboral, le dejo mi mail ${contact} y mi numero personal ${phone}.
    Para mas detalles puede buscar por mi nombre (${fullName}) por la pagina de Henry Dev Jobs y ver todo en detalle de mi perfil.</p>
  
`;
  //esta es la estructura que se va a enviar por correo
  console.log(contentHtml);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER, // generated ethereal user
      pass: process.env.MAILER_PASS, // generated ethereal password, guardar en una .env
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "Tejon Admin <henrydevjobs@gmail.com>",
    to: `${email}`,
    subject: "Contacto recibido",
    html: contentHtml,
  });

  console.log("message sent so", info.messageId);

  res.json({
    message: "email send",
  });
});

//Ruta para resetear Password del Alumno
router.post("/sendResetAlumno", async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  contentHtml = `
        <h1>User information</h1>
        <ul>
            <li>User email: ${email}</li>
        </ul>
        <p>Usted ha solicitado la recuperacion de su contraseña, haga click en el sigiuente link para recuperarla:
        <a href='http://${process.env.APP_URL}${process.env.APP_PORT}/resetPasswordAlumno/${token}'>AQUI</a>
        </br>Si no solicito la recuperacion de constraseña ignore este mail.</p>
    `;
  //esta es la estructura que se va a enviar por correo
  console.log(contentHtml);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER, // generated ethereal user
      pass: process.env.MAILER_PASS, // generated ethereal password, guardar en una .env
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "Tejon Admin <henrydevjobs@gmail.com>",
    to: `${email}`,
    subject: "Recuperar contraseña",
    html: contentHtml,
  });

  res.json({
    message: "email sent",
  });
});

//Ruta para resetear Password del Alumno
router.post("/sendResetAlumno", async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  contentHtml = `
        <h1>User information</h1>
        <ul>
            <li>User email: ${email}</li>
        </ul>
        <p>Usted ha solicitado la recuperacion de su contraseña, haga click en el sigiuente link para recuperarla:
        <a href='http://${process.env.APP_URL}${process.env.APP_PORT}/resetPasswordAlumno/${token}'>AQUI</a>
        </br>Si no solicito la recuperacion de constraseña ignore este mail.</p>
    `;
  //esta es la estructura que se va a enviar por correo
  console.log(contentHtml);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER, // generated ethereal user
      pass: process.env.MAILER_PASS, // generated ethereal password, guardar en una .env
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "Tejon Admin <henrydevjobs@gmail.com>",
    to: `${email}`,
    subject: "Recuperar contraseña",
    html: contentHtml,
  });

  res.json({
    message: "email sent",
  });
});

//Ruta Reseteo de Password Empresa
router.post("/sendResetEmpresa", async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  contentHtml = `
        <h1>User information</h1>
        <ul>
            <li>User email: ${email}</li>
        </ul>
        <p>Usted ha solicitado la recuperacion de su contraseña, haga click en el sigiuente link para recuperarla:
        <a href='http://${process.env.APP_URL}${process.env.APP_PORT}/resetPasswordEmpresa/${token}'>AQUI</a>
        </br>Si no solicito la recuperacion de constraseña ignore este mail.</p>
    `;
  //esta es la estructura que se va a enviar por correo
  console.log(contentHtml);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER, // generated ethereal user
      pass: process.env.MAILER_PASS, // generated ethereal password, guardar en una .env
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "Tejon Admin <henrydevjobs@gmail.com>",
    to: `${email}`,
    subject: "Recuperar contraseña",
    html: contentHtml,
  });

  res.json({
    message: "email sent",
  });
});

/*router.post("/resetPassword", async (req, res) => {
  const email = jwt.verify(req.body.token, process.env.SECRET_KEY)

  const empresa = empresaPorMail
})*/

module.exports = router;
