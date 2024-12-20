const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarAutenticacionCliente(req, res, next){

const header = req.headers['authorization'];

if (header) {
    const token = header.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('Token inválido o expirado');
      } else {
        req.cliente = decoded.cliente; 
        next();
      }
    });
  } else {
    res.status(401).send('Token de autenticación no proporcionado');
  }



}

module.exports = {verificarAutenticacionCliente};