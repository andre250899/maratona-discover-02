const express = require('express');
const server = express();
const routes = require("./routes");
const path = require('path')

//template engine do ejs
server.set('view engine', 'ejs')

//mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos statics
server.use(express.static('public'))

//usar o req.body
server.use(express.urlencoded({ extended: true }))

//usando as routes
server.use(routes)

//abrindo a porta
server.listen(2508, () => console.log('Servidor Inicializado!'))