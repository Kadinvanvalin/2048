console.log("hey");

function GameTwentyFourtyEight() {
  this.grid = [new Cell(4), new Cell(2),new Cell(2),new Cell(0)]
}

function Cell (givenValue) {
  this.merged = false;
  this.value = givenValue;
}

GameTwentyFourtyEight.prototype.setup = function(first_argument) {
  // body...
  // makeSomeCells()
};

GameTwentyFourtyEight.prototype.moveRight = function() {
  for(var i = this.grid.length - 2; i >= 0; i-- ){

    var zeroCheck = i
    // check zero move right
    while(this.grid[zeroCheck + 1] !== undefined && this.grid[zeroCheck + 1].value === 0){
      this.grid[zeroCheck+1].value = this.grid[zeroCheck].value
      console.log("while loop")
      this.grid[zeroCheck].value = 0
      zeroCheck++
    }
    // dont mark zero as merged
    if (this.grid[zeroCheck].value === 0) {
      console.log('fuckin a');
      console.log(this.grid[zeroCheck].merged);
      // merge if you are a match
    } else if(this.grid[zeroCheck + 1] !== undefined && this.grid[zeroCheck].value === this.grid[zeroCheck+1].value) {
      this.grid[zeroCheck].value = 0;
      this.grid[zeroCheck+1].value = this.grid[zeroCheck+1].value * 2;
      this.grid[zeroCheck+1].merged = true;
    }

  }

}
var mygame = new GameTwentyFourtyEight


mygame.moveRight();