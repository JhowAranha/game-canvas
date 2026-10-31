import Player from "./Player.js"

export default class Game {
  constructor (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.players = []
    this.lines = []
  }

  init () {
    this.addPlayer(1,1)
    this.addPlayer(3,4)
    this.addPlayer(8,7)
    this.addPlayer(2,3)

    const buttonsActions = {
      "up": () => this.actions("move", "up"),
      "down": () => this.actions("move", "down"),
      "left": () => this.actions("move", "left"),
      "right": () => this.actions("move", "right")
    }

    for (const [id, action] of Object.entries(buttonsActions)) {
      const btn = document.getElementById(id)
      if (btn) {
        btn.addEventListener("touchstart", action)
      }
    }

    const viewLinesBtn = document.getElementById("view-lines")
    if (viewLinesBtn) {
      viewLinesBtn.addEventListener("touchstart", () => this.actions("view-lines"))
      viewLinesBtn.addEventListener("touchend", () => this.actions("hide-lines"))
    }

    window.addEventListener("touchend", (e) => {
      this.actions("hide-lines", "")
    })
    
    window.addEventListener("keydown", (e) => {
      e.preventDefault()

      if (e.key === "w" || e.key === "ArrowUp") this.actions("move", "up")
      if (e.key === "a" || e.key === "ArrowLeft") this.actions("move", "left")
      if (e.key === "d" || e.key === "ArrowRight") this.actions("move", "right")
      if (e.key === "s" || e.key === "ArrowDown") this.actions("move", "down")
      if (e.key === " ") this.actions("view-lines", "")
      if (e.key === "F5") window.location.reload()
    }) 

    window.addEventListener("keyup", (e) => {
      e.preventDefault()
      this.actions("hide-lines", "")
    })

    this.gameLoop()
  }

  gameLoop () {
    this.draw()

    requestAnimationFrame(()=>this.gameLoop())
  }

  draw () {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const line of this.lines) {
      this.ctx.fillStyle = line.color
      this.ctx.fillRect(line.x, line.y, 1, 1)
    }
    
    for (const player of this.players) {
      this.ctx.fillStyle = player.color
      this.ctx.fillRect(player.x, player.y, 1, 1)
    }
  }

  actions(cmd, add) {
    switch (cmd) {
      case "view-lines":
        let color = "#e35f5fb5"
        for (let x = this.currentPlayer.x; x < canvas.width; x++) {
          this.lines.push({
            color: color,
            x: x,
            y: this.currentPlayer.y
          })
        }

        for (let x = this.currentPlayer.x; x >= 0; x--) {
          this.lines.push({
            color: color,
            x: x,
            y: this.currentPlayer.y
          })
        }

        for (let y = this.currentPlayer.y; y < canvas.height; y++) {
          this.lines.push({
            color: color,
            y: y,
            x: this.currentPlayer.x
          })
        }

        for (let y = this.currentPlayer.y; y >= 0; y--) {
          this.lines.push({
            color: color,
            y: y,
            x: this.currentPlayer.x
          })
        }

        // Check death
        for (const cell of this.lines) {
          for (const player of this.players) {
            if (player != this.currentPlayer) {
              if (cell.x == player.x && cell.y == player.y) {
                this.players.splice(this.players.indexOf(player), 1)
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
        this.currentPlayer.move(add)
        this.currentPlayer.sobP(this.players)
        break
    }
  }

  addPlayer (x, y) {
    this.players.push(new Player(this.players.length, x,y))

    if (this.players.length > 0) {
      this.currentPlayer = this.players[0]
      this.currentPlayer.originalColor = "blue"
      this.currentPlayer.color = "blue"
    }
  }
}