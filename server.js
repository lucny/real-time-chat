// Načtení potřebných modulů
const express = require('express');  // Express.js framework pro vytvoření webového serveru
const http = require('http');        // Modul HTTP pro vytvoření serveru
const socketIo = require('socket.io'); // Socket.io pro real-time komunikaci

const app = express(); // Vytvoření instance Express aplikace
const server = http.createServer(app); // Vytvoření HTTP serveru pomocí Express aplikace
const io = socketIo(server); // Integrace socket.io se serverem

// Nastavení middleware pro statické soubory
app.use(express.static('public')); // Umožňuje servírovat soubory z adresáře 'public'

// Zpracování nového spojení přes socket.io
io.on('connection', (socket) => {
  console.log('a user connected'); // Zaznamenání připojení uživatele

  // Zpracování odpojení uživatele
  socket.on('disconnect', () => {
    console.log('user disconnected'); // Zaznamenání odpojení uživatele
  });

  // Zpracování příchozích zpráv chatu
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Odeslání zprávy všem připojeným uživatelům
  });
});

// Spuštění serveru na portu 3000
server.listen(3000, () => {
  console.log('listening on *:3000'); // Zaznamenání spuštění serveru
});