console.log("hey");

// [[new Cell(4), new Cell(2),new Cell(2),new Cell(0)],
//                 [new Cell(0), new Cell(2),new Cell(2),new Cell(0)],
//                 [new Cell(0), new Cell(2),new Cell(2),new Cell(2)],
//                 [new Cell(0), new Cell(2),new Cell(0),new Cell(0)]]


function Cell (givenValue) {
  this.merged = false;
  this.value = givenValue;
}

function GameTwentyFortyEight(numberString) {
  this.grid = numberString;
}

GameTwentyFortyEight.prototype.setup = function() {
  this.setUpBoard(this.mapItOutSon());
};

GameTwentyFortyEight.prototype.oneFullMove = function() {
  // user input
  // AND THEN
  var cellArray = this.findAZero(this.flatten());
  this.setUpBoard(cellArray);
}

GameTwentyFortyEight.prototype.setUpBoard = function(cellArray){
  var gameGrid = []
  for (var i = 0; i < cellArray.length; i += 4) {
    gameGrid.push(cellArray.slice(i, i+4));
  };
  this.grid = gameGrid;
}

GameTwentyFortyEight.prototype.mapItOutSon = function() {
  var numArray = this.grid.split("");
  var cellArray = numArray.map(function(number) {
    return new Cell(parseInt(number));
  });
  return cellArray;
};

GameTwentyFortyEight.prototype.findAZero = function(cellArray) {
  var zeroesArray = [];
  cellArray.forEach(function(cell, index) {
    if (cell.value === 0) zeroesArray.push(index)
  });
  var cellToChange = _.sample(zeroesArray)
  cellArray[cellToChange].value = _.sample([2,4])
  return cellArray
}

GameTwentyFortyEight.prototype.flatten = function() {
  return _.flatten(this.grid)
}

// GameTwentyFortyEight.prototype.toString = function() {
//   return this.flatten().map((cell)=>{return cell.value})
// };


// User Input Logic:

GameTwentyFortyEight.prototype.resetMerge = function(grid) {
  function resetArray(cell){
    cell.merged = false;
  }
  grid.forEach((array)=> array.forEach((cell)=>resetArray(cell)));
};
GameTwentyFortyEight.prototype.flipBoard = function (){
  return _.zip.apply(_, this.grid);
};
GameTwentyFortyEight.prototype.moveDown = function (){
  var flipped = this.moveAllRight(this.flipBoard(this.grid));
  // this.grid = this.flipBoard(this.grid)
};

GameTwentyFortyEight.prototype.moveUp = function (){
  var flipped = this.moveAllLeft(this.flipBoard(this.grid));
};


GameTwentyFortyEight.prototype.offBoardRight = function(array, zeroCheck) {
  return array[zeroCheck + 1] !== undefined;
};

GameTwentyFortyEight.prototype.offBoardLeft = function(array, zeroCheck) {
  return array[zeroCheck - 1] !== undefined;
};

GameTwentyFortyEight.prototype.moveAllRight = function(grid) {
  console.log(grid)
  grid.forEach((array)=>{
    this.moveRight(array);
  });
};

GameTwentyFortyEight.prototype.moveAllLeft = function(grid) {
  grid.forEach((array)=>{
    this.moveLeft(array);
  });
};

GameTwentyFortyEight.prototype.zeroCheckMoveRight = function(array, zeroCheck){
    while(this.offBoardRight(array, zeroCheck) && array[zeroCheck + 1].value === 0){
      array[zeroCheck+1].value = array[zeroCheck].value;
      console.log("while loop");
      array[zeroCheck].value = 0;
      zeroCheck++;
    }
    return zeroCheck;
};

GameTwentyFortyEight.prototype.moveRight = function(array) {
  for(var i = array.length - 2; i >= 0; i-- ){

    var zeroCheck = i;
    // check zero move right
    zeroCheck = this.zeroCheckMoveRight(array, zeroCheck);
    // dont mark zero as merged
    if (array[zeroCheck].value === 0) {
      // merge if you are a match
    } else if(this.offBoardRight(array, zeroCheck) && !(array[zeroCheck+1].merged) && array[zeroCheck].value === array[zeroCheck+1].value) {
      array[zeroCheck].value = 0;
      array[zeroCheck+1].value = array[zeroCheck+1].value * 2;
      array[zeroCheck+1].merged = true;
    }
  }
};

GameTwentyFortyEight.prototype.zeroCheckMoveLeft = function(array, zeroCheck){
  while(this.offBoardLeft(array, zeroCheck) && array[zeroCheck - 1].value === 0){
    array[zeroCheck-1].value = array[zeroCheck].value;
    console.log("while loop");
    array[zeroCheck].value = 0;
    zeroCheck--;
  }
  return zeroCheck;
};


GameTwentyFortyEight.prototype.moveLeft = function(array) {
  for(var i = 1; i < array.length; i++) {
    var zeroCheck = i;
    zeroCheck = this.zeroCheckMoveLeft(array, zeroCheck);

    if (array[zeroCheck].value === 0) {
      // merge if you are a match
    } else if(this.offBoardLeft(array, zeroCheck) && !(array[zeroCheck-1].merged) && array[zeroCheck].value === array[zeroCheck-1].value) {
      array[zeroCheck].value = 0;
      array[zeroCheck-1].value = array[zeroCheck-1].value * 2;
      array[zeroCheck-1].merged = true;
    }
  }
};

GameTwentyFortyEight.prototype.moveShitRight = function(){
  this.moveAllRight(this.grid);
  this.oneFullMove();
  this.pretty();
}

GameTwentyFortyEight.prototype.moveShitLeft = function(){
  this.moveAllLeft(this.grid);
  this.oneFullMove();
  this.pretty();
}

GameTwentyFortyEight.prototype.pretty = function(){
  console.log(this.grid.map(function(row){ 
    return row.map(function (cell){
      return cell.value
    })
  })
)}

var mygame = new GameTwentyFortyEight("0000202000000000");

Mousetrap.bind('up', mygame.moveUp.bind(mygame));

Mousetrap.bind('down', mygame.moveDown.bind(mygame));

Mousetrap.bind('right', mygame.moveShitRight.bind(mygame));

Mousetrap.bind('left', mygame.moveShitLeft.bind(mygame));

Mousetrap.bind('p', mygame.pretty.bind(mygame))

