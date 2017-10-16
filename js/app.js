console.log("hey");

function GameTwentyFourtyEight() {
  this.grid = [[new Cell(4), new Cell(2),new Cell(2),new Cell(0)],
                [new Cell(0), new Cell(2),new Cell(2),new Cell(0)],
                [new Cell(0), new Cell(2),new Cell(2),new Cell(2)],
                [new Cell(0), new Cell(2),new Cell(0),new Cell(0)]]
}

function Cell (givenValue) {
  this.merged = false;
  this.value = givenValue;
}


GameTwentyFourtyEight.prototype.setup = function(first_argument) {
  // body...
  // makeSomeCells()
};
GameTwentyFourtyEight.prototype.resetMerge = function(grid) {
  function resetArray(cell){
    cell.merged = false;
  }
  grid.forEach((array)=> array.forEach((cell)=>resetArray(cell)));
};
GameTwentyFourtyEight.prototype.flipBoard = function (){
  return _.zip.apply(_, this.grid)
}
GameTwentyFourtyEight.prototype.moveDown = function (){
  var flipped = this.moveAllRight(this.flipBoard(this.grid))
  // this.grid = this.flipBoard(this.grid)
}

GameTwentyFourtyEight.prototype.offBoard = function(array, zeroCheck) {
  return array[zeroCheck + 1] !== undefined
};

GameTwentyFourtyEight.prototype.moveAllRight = function(grid) {
  grid.forEach((array)=>{
    this.moveRight(array)
  });
}
GameTwentyFourtyEight.prototype.zeroCheckMove = function(array, zeroCheck){
    while(this.offBoard(array, zeroCheck) && array[zeroCheck + 1].value === 0){
      array[zeroCheck+1].value = array[zeroCheck].value
      console.log("while loop")
      array[zeroCheck].value = 0
      zeroCheck++
    }
    return zeroCheck
}


GameTwentyFourtyEight.prototype.moveRight = function(array) {
  for(var i = array.length - 2; i >= 0; i-- ){

    var zeroCheck = i
    // check zero move right
    zeroCheck = this.zeroCheckMove(array, zeroCheck);
    // dont mark zero as merged
    if (array[zeroCheck].value === 0) {
      // merge if you are a match
    } else if(this.offBoard(array, zeroCheck) && !(array[zeroCheck+1].merged) && array[zeroCheck].value === array[zeroCheck+1].value) {
      array[zeroCheck].value = 0;
      array[zeroCheck+1].value = array[zeroCheck+1].value * 2;
      array[zeroCheck+1].merged = true;
    }

  }

}
var mygame = new GameTwentyFourtyEight


