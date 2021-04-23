// setup canvas
let canvas = document.getElementById('display')
canvas.width =  800 // document.body.clientWidth
canvas.height = 800 // document.body.clientHeight
let ctx = canvas.getContext('2d')

// variables
let gridSize = 40
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
  ctx.fillStyle = 'white'
  ctx.strokeRect(0, 0, gridSize, gridSize)
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
  console.log(event.code)
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
	return {x: x, y: y}
}

// check eating
function checkEating() {
	if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
		eraseFood(fruit.x, fruit.y)
		drawHead(fruit.x, fruit.y)
		console.log("on")
		fruit = newFruit()
		drawCircle(fruit.x, fruit.y)
		console.log(fruit)
		score += 1
		console.log(score)
	}
}

// check out of bounds
function checkOut() {
	if(snake[0].x === 20 || snake[0].x === -1 || snake[0].y === 20 || snake[0].y === -1) {
		console.log("game over")
		return true
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
var intervalID = window.setInterval(loop, 500)

// array of objects - storing x and y properties
// go through the values of the array and draw the square and then draw the head
// direction + add in the current direction then pop off the last
