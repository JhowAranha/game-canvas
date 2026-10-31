var socket = io()

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const buttonsActions = {
    "up": () => socket.emit("action", ["move", "up"]),
    "down": () => socket.emit("action", ["move", "down"]),
    "left": () => socket.emit("action", ["move", "left"]),
    "right": () => socket.emit("action", ["move", "right"])
}

for (const [id, action] of Object.entries(buttonsActions)) {
    const btn = document.getElementById(id)
    if (btn) {
        btn.addEventListener("touchstart", action)
    }
}

const viewLinesBtn = document.getElementById("view-lines")
if (viewLinesBtn) {
    viewLinesBtn.addEventListener("touchstart", () => socket.emit("action", ["view-lines", ""]))
    viewLinesBtn.addEventListener("touchend", () => socket.emit("action", ["hide-lines", ""]))
}

window.addEventListener("touchend", (e) => {
    socket.emit("action", ["hide-lines", ""])
})

window.addEventListener("keydown", (e) => {
    e.preventDefault()

    if (e.key === "w" || e.key === "ArrowUp") socket.emit("action", ["move", "up"])
    if (e.key === "a" || e.key === "ArrowLeft") socket.emit("action", ["move", "left"])
    if (e.key === "d" || e.key === "ArrowRight") socket.emit("action", ["move", "right"])
    if (e.key === "s" || e.key === "ArrowDown") socket.emit("action", ["move", "down"])
    if (e.key === " ") actions("view-lines", "")
    if (e.key === "F5") window.location.reload()
}) 

window.addEventListener("keyup", (e) => {
    e.preventDefault()
    socket.emit("action", ["hide-lines", ""])
})

function draw (players, lines) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const line of lines) {
        ctx.fillStyle = line.color
        ctx.fillRect(line.x, line.y, 1, 1)
    }

    for (const player of players) {
        ctx.fillStyle = player.color
        ctx.fillRect(player.x, player.y, 1, 1)
    }
}
