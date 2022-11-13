console.log('test');


const socketClient = io()

const chatContainer = document.getElementById("chatContainer")


socketClient.on("msgChat", (data) => {
  console.log(data);
  let messages = ""
  data.forEach(element => {
    messages += `<p>Autor: ${element.author} - mensaje: ${element.text}</p>`
  });

  chatContainer.innerHTML = messages
})
//capturamos el nombre del ususario que se conecta al chat
let user = ""
Swal.fire({
  title: "Bienvenido",
  text: "Ingresa tu nombre de usuario",
  input: "text",
  allowOutsideClick: false
}).then(response => {
  user = response.value;
  console.log(user);
  document.getElementById("userName").innerHTML = `Hola ${user}!`
})

//enviamos el mensaje del form al servidor
const chatForm = document.getElementById("chatForm")

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();//prevenimos que se relanze el alert incial
  console.log("formulario enviado");
  const mensaje = {
    author: user,
    text: document.getElementById("msgChat").value
  }
  console.log(mensaje);
  //enviamos nuevo mensaje
  socketClient.emit("newMsg", mensaje)
})