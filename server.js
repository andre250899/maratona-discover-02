const express = require('express');
const server = express();

server.get('/', (req, res) => res.send('Oi'))

server.listen(2508, () => console.log('Servidor Inicializado!'))