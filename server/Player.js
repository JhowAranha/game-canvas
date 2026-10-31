export default class Player {
  constructor (id, x, y) {
    this.id = id
    this.x = x
    this.y = y
    this.originalColor = "black"
    this.color = this.originalColor
  }

  move (direction) {
    switch (direction) {
      case "right":
        this.x++
        break
      case "left":
        this.x--
        break
      case "up":
        this.y--
        break
      case "down":
        this.y++
        break
    }
  }

  sobP (players) {
    for (const player of players) {
      if (player.id != this.id) {
        if (player.x == this.x &&
         player.y == this.y) {
        this.color = "gray"
        player.color = "gray"
         } else {
          this.color = this.originalColor
          player.color = player.originalColor
         }
      }
    }
  }

  
}