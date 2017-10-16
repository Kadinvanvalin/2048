console.log("hey");

function GameTwentyFortyEight() {
  this.grid = [[new Cell(4), new Cell(2),new Cell(2),new Cell(0)],
                [new Cell(0), new Cell(2),new Cell(2),new Cell(0)],
                [new Cell(0), new Cell(2),new Cell(2),new Cell(2)],
                [new Cell(0), new Cell(2),new Cell(0),new Cell(0)]];
}

function Cell (givenValue) {
  this.merged = false;
  this.value = givenValue;
}

GameTwentyFortyEight.prototype.flatten = function() {
  return _.flatten(this.grid)
}

GameTwentyFortyEight.prototype.toString = function() {
  return this.flatten().map((cell)=>{return cell.value})
};

GameTwentyFortyEight.prototype.spawnBlock = function() {

};

GameTwentyFortyEight.prototype.setup = function(first_argument) {
  // body...
  // makeSomeCells()
};
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



var mygame = new GameTwentyFortyEight;


