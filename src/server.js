const express = require('express');
const server = express();
const routes = require("./routes");

//template engine do ejs
server.set('view engine', 'ejs')

//habilitar arquivos statics
server.use(express.static('public'))

//usando as routes
server.use(routes)

//abrindo a porta
server.listen(2508, () => console.log('Servidor Inicializado!'))
