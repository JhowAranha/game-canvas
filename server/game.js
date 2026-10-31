import Player from "./Player.js"

export default class game {
  constructor () {
    this.players = []
    this.lines = []
  }

  actions(player, cmd, add) {
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

        // Check death
        for (const cell of this.lines) {
          for (const plr of this.players) {
            if (plr != player) {
              if (cell.x == plr.x && cell.y == plr.y) {
                
                console.log("Death")
              }
            }
          }
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
    for (const plr of this.players) {
      if (plr.id != id) return
      this.players.splice(this.players.indexOf(plr), 1)
    }
  }
}