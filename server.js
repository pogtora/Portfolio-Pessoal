require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Importar o pacote cors
const app = express();
const port = 3000;

// Configuração do transportador do nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.use(cors()); // Adicionar o middleware cors
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/enviar-email', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.SMTP_USER,
    subject: `Nova mensagem de ${nome}`,
    text: mensagem,
    html: `<p>${mensagem}</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: ' + info.response);
    res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (erro) {
    console.error('Erro ao enviar email:', erro);
    res.status(500).json({ message: `Houve um erro ao enviar a mensagem: ${erro.message}` });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
