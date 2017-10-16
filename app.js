console.log("hey");

function GameTwentyFourtyEight() {
  this.grid = [new Cell(4), new Cell(0),new Cell(2),new Cell(2)]
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
    while(zeroCheck + 1 < this.grid.length - 1 && this.grid[zeroCheck + 1].value === 0){
      this.grid[zeroCheck+1].value = this.grid[zeroCheck].value
      console.log("while loop")
      this.grid[zeroCheck].value = 0
      zeroCheck++
    }
    if (this.grid[i].value === 0) {
      console.log('fuckin a');
      console.log(this.grid[i].merged);
    } else if(this.grid[i].value === this.grid[i+1].value) {
      this.grid[i].value = 0;
      this.grid[i+1].value = this.grid[i+1].value * 2;
      this.grid[i+1].merged = true;
    }

  }

}
var mygame = new GameTwentyFourtyEight


mygame.moveRight();