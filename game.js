// git: https://github.com/starcassie/snakeGame.git
// setup canvas
let canvas = document.getElementById('display')
let button = document.getElementById('button')
canvas.width =  400 // document.body.clientWidth
canvas.height = 400 // document.body.clientHeight
let ctx = canvas.getContext('2d')

// variables
let gridSize = 20
let gridWidth = Math.floor(canvas.width / gridSize)
let gridHeight = Math.floor(canvas.height / gridSize)

// snake and the direction
let snake = [{x: 5, y:3},
			 {x: 4, y: 3},
			 {x: 3, y: 3},
			 {x:3, y: 2}]

let direction = "right"

let fruit = {x: 7, y: 3}
let score = 0
let scoreCount = $('h1')

// draws snake
function drawSnake() {
	let head = snake[0]
	drawHead(head.x, head.y)
	for(let i = 1; i < snake.length; i++) {
		let body = snake[i]
		drawSquare(body.x, body.y)
	}
}

// draw helpers
function erase() {
  ctx.fillStyle = '#000044'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}
function drawSquare(x, y) {
  ctx.fillStyle = 'green'
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
}
function eraseFood(x, y) {
  ctx.clearRect(x * gridSize, y * gridSize, gridSize, gridSize)
  ctx.fillStyle = '#000044'
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
}
function drawHead(x, y) {
  ctx.fillStyle = 'darkgreen'
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
}
function drawCircle(x, y) {
  ctx.fillStyle = 'red'
  ctx.beginPath()
  ctx.arc(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2, gridSize / 2, 0, 2 * Math.PI)
  ctx.fill()
}

// user input
window.addEventListener('keydown', event => {
  if (event.code === "ArrowRight" && direction !== "left") {
  	direction = "right"
  } else if(event.code === "ArrowLeft" && direction !== "right") {
  	direction = "left"
  } else if (event.code === "ArrowUp" && direction !== "down") {
  	direction = "up"
  } else if (event.code === "ArrowDown" && direction !== "up") {
  	direction = "down"
  }
})

// move snake
function moveSnake() {
	let head = snake[0]
	if (direction === "right") {
		let newHead = {x: (head.x + 1), y: head.y}
		snake.unshift(newHead)
		snake.pop()
	} else if (direction === "left") {
		let newHead = {x: (head.x - 1), y: head.y}
		snake.unshift(newHead)
		snake.pop()
	} else if (direction === "up") {
		let newHead = {x: head.x, y: (head.y - 1)}
		snake.unshift(newHead)
		snake.pop()
	} else {
		let newHead = {x: head.x, y: (head.y + 1)}
		snake.unshift(newHead)
		snake.pop()
	}
}

// get new fruit location
function newFruit() {
	let x = Math.floor(Math.random() * canvas.width / gridSize)
	let y = Math.floor(Math.random() * canvas.width / gridSize)
	let val = {x: x, y: y}
	for (let i = 1; i < snake.length; i++) {
		if(x === snake[i].x && y === snake[i].y) {
			val = newFruit()
			break
		}
	}
	return val
}

// check eating
function checkEating() {
	if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
		eraseFood(fruit.x, fruit.y)
		drawHead(fruit.x, fruit.y)
		fruit = newFruit()
		drawCircle(fruit.x, fruit.y)
		score += 1
		let end = {x: snake[snake.length - 1].x, y: snake[snake.length - 1].y}
		snake.push(end)
		scoreCount.text("score: " + score)
	}
}

// check out of bounds
function checkOut() {
	if (snake[0].x === 20 || snake[0].x === -1 || snake[0].y === 20 || snake[0].y === -1) {
		scoreCount.text("game over! FINAL score: " + score)
		button.classList.toggle('hide')
		return true
	}
	for (let i = 1; i < snake.length; i++) {
		if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
			scoreCount.text("game over! FINAL score: " + score)
			button.classList.toggle('hide')
			return true
		}
	}
	return false
}

// game loop
function loop() {
	erase()
	drawCircle(fruit.x, fruit.y)
	drawSnake()
	checkEating()
	moveSnake()
	if (checkOut()) {
		clearInterval(intervalID)
	}
}

var intervalID = window.setInterval(loop, 100)

function playAgain() {
	button.classList.toggle('hide')
	snake = [{x: 5, y:3},
			 {x: 4, y: 3},
			 {x: 3, y: 3},
			 {x:3, y: 2}]
	direction = "right"
	fruit = {x: 7, y: 3}
	score = 0
	intervalID = window.setInterval(loop, 100)
}

button.addEventListener("click", playAgain)