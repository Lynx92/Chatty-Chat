const socket = io();

//DOM elements
let message = document.querySelector("#message");
let username = prompt("What is your name?");
let btn = document.querySelector("#send");
let text = document.querySelector(".text");
let actions = document.querySelector(".actions");
let userlist = document.querySelector(".userlist");

while (username == null || username == "" || username == undefined) {
  username = prompt("Seriously...what is your name?");
}

btn.addEventListener("click", e => {
  e.preventDefault();
  socket.emit("message", {
    username: username,
    message: message.value
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", username);
});

socket.on("message", data => {
  actions.innerHTML = "";
  text.innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p>`;
});

socket.on("typing", data => {
  actions.innerHTML = `<p><em>${data} is typing...</em></p>`;
});

setTimeout(() => {
  socket.emit("userlist", username);
});


socket.on("userlist", data => {
  console.log(data);
  var node = document.createElement("LI"); // Create a <li> node
  var textnode = document.createTextNode(`${data}`); // Create a text node
  node.appendChild(textnode); // Append the text to <li>
  userlist.appendChild(node);
});
