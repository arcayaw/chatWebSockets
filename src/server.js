//creamos el servidor de express
const express = require('express')
const { Server } = require('socket.io')
const app = express()


const PORT = process.env.PORT || 8080;

//servidor de express
const server = app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

app.use(express.static(__dirname + "/public"))

//configuramos server websocket del lado del backend
const io = new Server(server)

const messages = [
  { author: "Juan", text: "¡Hola! ¿Que tal?" },
  { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
  { author: "Ana", text: "¡Genial!" }
];


//detectar cada socket de un cliente que se conecte a nuestro socket del back. El metodo on pone al socket a escuchar.
io.on("connection", (socket) => {
  console.log('Nuevo cliente conectdo');

  //enviamnos los mensjes al cliente.
  socket.emit("msgChat", messages)

  //recibimos el mensaje
  socket.on("newMsg", (data) => {
    messages.push(data)

    //enviamos los mensajes a todos los sockets conectados
    io.sockets.emit("msgChat", messages)
  })

})



