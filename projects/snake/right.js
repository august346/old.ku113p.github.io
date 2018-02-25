var GAMER = "Gamer"

var LIMIT = 10;
var MAX_X = LIMIT - 1;
var MAX_Y = LIMIT - 1;
var SCALE_SIZE = 50;

var vector = 'top';
var speed = 500;
var flag = false;
var counter = 1;

var snake = createSnake();
var busyCells = [];
updateBusyCells();
var apple = createApple();

addAllOnWindow(snake, apple);
setTimeout(moveSnake, speed);
setTimeout(drawAllEllements, speed);

function addAllOnWindow() {
  snake.forEach((item) => {
    addElementOnWindow(item, "area");
  });
  addElementOnWindow(apple, "area");
  addResultMonitor();
}

function SnakeElement(name, parent, prepos) {
  this.name = name;
  this.parent = parent;
  this.position = parent.prepos;
  this.prepos = prepos;
}

function createHead() {
  var head = {
    name: "head",
    position: [LIMIT / 2, LIMIT / 2],
    prepos: [LIMIT / 2, LIMIT / 2 + 1],
    eatApple: () => {
      var newName = "teil-" + counter;
      var newParent = snake[snake.length - 1];
      var newElement = new SnakeElement(newName, newParent, []);
alert("Start the Game!");

var LIMIT = 10;
var MAX_X = LIMIT - 1;
var MAX_Y = LIMIT - 1;
var SCALE_SIZE = 50;

var vector = 'top';
var speed = 500;
var flag = false;
var counter = 1;

var snake = createSnake();
var busyCells = [];
updateBusyCells();
var apple = createApple();

addAllOnWindow(snake, apple);
setTimeout(moveSnake, speed);
setTimeout(drawAllEllements, speed);

function addAllOnWindow() {
  snake.forEach((item) => {
    addElementOnWindow(item, "area");
  });
  addElementOnWindow(apple, "area");
  addResultMonitor();
}

function SnakeElement(name, parent, prepos) {
  this.name = name;
  this.parent = parent;
  this.position = parent.prepos;
  this.prepos = prepos;
}

function createHead() {
  var head = {
    name: "head",
    position: [LIMIT / 2, LIMIT / 2],
    prepos: [LIMIT / 2, LIMIT / 2 + 1],
    eatApple: () => {
      var newName = "teil-" + counter;
      var newParent = snake[snake.length - 1];
      var newElement = new SnakeElement(newName, newParent, []);
      snake.push(newElement);
      addElementOnWindow(newElement, "area");
      apple.position = getNewApplePosition();
    }
  }
  return head;
}

function createSnake() {
  var snakeArr = [];
  var head = createHead();
  var second = new SnakeElement("second", head, [LIMIT / 2, LIMIT / 2 + 2]);
  var third = new SnakeElement("third", second, [LIMIT / 2, LIMIT / 2 + 3]);
  snakeArr.push(head, second, third);
  return snakeArr;
}

function createApple() {
  var apple = {
    name: "apple",
    position: getNewApplePosition()
  }
  return apple;
}

function getNewApplePosition() {
  var x = Math.floor(Math.random() * LIMIT);
  var y = Math.floor(Math.random() * LIMIT);
  var busy = isBusy(x, y, 0);
  return busy ? getNewApplePosition() : [x, y];
};

function updateBusyCells() {
  busyCells = snake.map(function(el) {
    return el.position;
  })
}

function isBusy(x, y, startSearch) {
  var result = false;
  updateBusyCells();
  for (var i = startSearch; i < busyCells.length; i++) {
    if (result == true) break;
    result = busyCells[i][0] == x && busyCells[i][1] == y;
  }
  return result;
}

function addElementOnWindow(element, areaName) {
  var d = document.createElement("div");

  if (element.name == "head") {
    d.id = element.name;
  } else if (element.name == "apple") {
    d.id = "apple";
  } else {
    d.className = "snake-element";
    d.id = "teil-" + counter++;
  }
  d.className = d.className + " added";

  d.style.top = element.position[1] * SCALE_SIZE + "px";
  d.style.left = element.position[0] * SCALE_SIZE + "px";
  document.getElementById(areaName).appendChild(d);
  element.div = d;
}

function addResultMonitor() {
  var resMon = document.createElement("div");
  resMon.id = "info-list";
  resMon.innerHTML = counter;
  document.body.insertBefore(resMon, document.body.firstChild);
}

function updateElementPosition(element) {
  element.prepos = element.position;
  element.position = element.parent.prepos;
}

function moveSnake() {
  flag = false;
  if (vector != "") {
    moveHead();
    moveTail();
    if (isBusy(snake[0].position[0], snake[0].position[1], 1)) {
      alert("You lose!\nResult = " + (counter-3) * 100 + " points!");
      window.location.reload(false);
    }
  }
  updateBusyCells();
  if (canEat()) {
    if (busyCells.length == LIMIT*LIMIT - 1) {
      alert("You Win!");
      window.location.reload(false);
    }
    snake[0].eatApple();
    speed = speed <= 200 ? speed : speed - 20;
    console.log(speed);
  }
  setTimeout(moveSnake, speed);
}

function moveHead() {
  snake[0].prepos = snake[0].position;
  var xPos = snake[0].prepos[0];
  var yPos = snake[0].prepos[1];
  switch (vector) {
    case 'top':
      yPos = yPos != 0 ? yPos - 1 : MAX_Y;
      break;
    case 'right':
      xPos = xPos < MAX_X ? xPos + 1 : 0;
      break;
    case 'down':
      yPos = yPos < MAX_Y ? yPos + 1 : 0;
      break;
    case 'left':
      xPos = xPos != 0 ? xPos - 1 : MAX_X;
      break;
  }
  snake[0].position = [xPos, yPos];
}

function moveTail() {
  for (var i = 1; i < snake.length; i++) {
    updateElementPosition(snake[i]);
  }
}

function canEat() {
  var xPos = snake[0].position[0];
  var yPos = snake[0].position[1];
  return (xPos == apple.position[0] && yPos == apple.position[1]);
}

function changeAppPosition() {
  apple.position = getNewApplePosition();
}

function drawAllEllements() {
  snake.forEach((el) => {
    drawElement(el);
  })
  drawElement(apple);
  document.getElementById("info-list").innerHTML = GAMER + ": " + (counter-3) * 100;
  setTimeout(drawAllEllements, speed);
}

function drawElement(element) {
  element.div.style.left = element.position[0] * SCALE_SIZE + "px";
  element.div.style.top = element.position[1] * SCALE_SIZE + "px";
}

document.addEventListener('keydown', (event) => {
  var keyName = event.key;
  switch (keyName) {
    case "ArrowUp":
      vector = vector != "down" && !flag ? 'top' : vector;
      flag = true;
      break;
    case "ArrowRight":
      vector = vector != 'left' && !flag ? 'right' : vector;
      flag = true;
      break;
    case "ArrowDown":
      vector = vector != "top" && !flag ? 'down' : vector;
      flag = true;
      break;
    case "ArrowLeft":
      vector = vector != "right" && !flag ? 'left' : vector;
      flag = true;
      break;
    case "q":
      vector = "";
      break;
  }

//TEST
  document.addEventListener('touchstart', handleTouchStart, false);        
  document.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;                                                        
  var yDown = null;                                                        

  function handleTouchStart(evt) {                                         
      xDown = evt.touches[0].clientX;                                      
      yDown = evt.touches[0].clientY;                                      
  };                                                

  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
              vector = vector != "right" && !flag ? 'left' : vector;
              flag = true;
          } else {
              vector = vector != 'left' && !flag ? 'right' : vector;
              flag = true;
          }                       
      } else {
          if ( yDiff > 0 ) {
              vector = vector != "top" && !flag ? 'down' : vector;
              flag = true;
          } else { 
              vector = vector != "top" && !flag ? 'down' : vector;
              flag = true;
          }                                                                 
      }
      /* reset values */
      xDown = null;
      yDown = null;                                             
  };
});
