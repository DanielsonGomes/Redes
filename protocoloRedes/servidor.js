const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Um cliente se conectou');

  ws.on('message', function incoming(message) {
    console.log('Recebido: %s', message);

    // Simula processamento e envia uma confirmação
    setTimeout(() => {
      ws.send('Confirmação da mensagem: ' + message);
    }, 1000); // Ajuste o timeout conforme necessário
  });
});

console.log('Servidor WebSocket rodando na porta 8080');
   