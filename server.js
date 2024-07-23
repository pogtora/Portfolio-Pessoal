const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'cdajuniorf@gmail.com', 
    pass: '1954matheus' 
  }
});

app.post('/enviar-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'cdajuniorf@gmail.com', 
    subject: `Mensagem de ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error); 
      return res.status(500).json({ message: 'Houve um erro ao enviar a mensagem.' });
    }
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
