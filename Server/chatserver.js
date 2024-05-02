const chatserver=()=>{
const WebSocket = require('websocket').server;
const http = require('http');

const server = http.createServer((request, response) => {
  // Handle HTTP requests here
});
const b=6;
const webSocketServer = new WebSocket({
  httpServer: server,
});

webSocketServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);

  connection.on('message', (message) => {
    console.log(message)
    
    connection.send(message.utf8Data)
    console.log(message.utf8Data+"from the server")
    // Handle incoming WebSocket messages here
  });

  connection.on('close', (reasonCode, description) => {
    // Handle WebSocket connection closure here
  });
});

server.listen(3015, () => {
  console.log('WebSocket server is listening on port 3015');
});
}
module.exports= chatserver;