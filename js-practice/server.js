const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const port = process.env.PORT || 5000
const server = http.createServer(app); // корректировка

const wss = new WebSocket.Server({ server })

app.use(express.static(__dirname + '/views'));
//app.set("view engine", "html");
app.use("/", function(request, response){
    response.render("index.html")
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
});

server.listen(port, () => console.log (`Сервер запущен на ${port} хосте!`));
