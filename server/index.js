import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import game from "./game.js"

// Configuração do __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const Game = new game(io)

// Dica bônus: usar o express.static para servir toda a pasta public de uma vez
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  

  console.log('a user connected', socket.id);

  Game.addPlayer(socket.id,
                 Math.floor(Math.random()*10),
                 Math.floor(Math.random()*10))
  console.log(Game.players)
  
  io.emit("update", Game.players, Game.lines)
  
  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  })

  socket.on("action", (action) => {
    console.log(action)
    Game.actions(socket.id, action[0], action[1])
    io.emit("update", Game.players, Game.lines)
  })
});



server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});