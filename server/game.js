import Player from "./Player.js"

export default class game {
  constructor (io) {
    this.io = io
    this.players = []
    this.lines = []
  }

  actions(id, cmd, add) {
    let player;
    for (const plr of this.players) {
      if (plr.id == id) {
        player = plr
      }
    }

    if (!player) return
    
    switch (cmd) {
      case "view-lines":
        let color = "#e35f5fb5"
        for (let x = player.x; x < 10; x++) {
          this.lines.push({
            color: color,
            x: x,
            y: player.y
          })
        }

        for (let x = player.x; x >= 0; x--) {
          this.lines.push({
            color: color,
            x: x,
            y: player.y
          })
        }

        for (let y = player.y; y < 10; y++) {
          this.lines.push({
            color: color,
            y: y,
            x: player.x
          })
        }

        for (let y = player.y; y >= 0; y--) {
          this.lines.push({
            color: color,
            y: y,
            x: player.x
          })
        }

        this.io.emit("update", this.players, this.lines)

        // Check death
        let playerToKill = null;
        for (const cell of this.lines) {
          for (const plr of this.players) {
            if (plr.id != player.id) {
              if (cell.x == plr.x && cell.y == plr.y) {
                playerToKill = plr.id;
                break
              }
            }
          }
          if (playerToKill) break;
        }

        if (playerToKill) {
          console.log("Death - O inimigo foi caçado!")
          
          // Se quiser que a linha suma e o cara morra instantaneamente mas apareça o tiro:
          setTimeout(() => {
            this.removePlayer(playerToKill)
          }, 250); // 150 milissegundos para o player ver o tiro pegando nele antes de sumir
        }
        
        break
      case "hide-lines":
        this.lines = []
        break
      case "move":
        player.move(add)
        player.sobP(this.players)
        break
    }
  }

  addPlayer (id, x, y) {
    this.players.push(new Player(id, x, y))
    return "player added: " + id
  }

  removePlayer (id) {
    for (let i = this.players.length - 1; i >= 0; i--) {
      if (this.players[i].id === id) {
        this.players.splice(i, 1)
        break
      }
    }
        
    this.lines = []
    this.io.emit("update", this.players, this.lines)
  }
}