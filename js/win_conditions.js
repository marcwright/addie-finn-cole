$(function() {

  var winConditions = function() {
    if (moves[0] == playerTurn && moves[1] == playerTurn && moves[2] == playerTurn) {
      console.log(playerTurn + ' wins on row 1');
      freezeBoard();
    }
    else if (moves[3] == playerTurn && moves[4] == playerTurn && moves[5] == playerTurn) {
      console.log(playerTurn + ' wins on row 2');
      freezeBoard();
    }
    else if (moves[6] == playerTurn && moves[7] == playerTurn && moves[8] == playerTurn) {
      console.log(playerTurn + ' wins on row 3');
      freezeBoard();
    }
    else if (moves[0] == playerTurn && moves[4] == playerTurn && moves[8] == playerTurn || moves[2] == playerTurn && moves[4] == playerTurn && moves[6] == playerTurn) {
      console.log(playerTurn + ' wins on the diagonal');
      freezeBoard();
    }
    else if (moves[0] == playerTurn && moves[3] == playerTurn && moves[6] == playerTurn) {
      console.log(playerTurn + ' wins in column 1');
      freezeBoard();
    }
    else if (moves[1] == playerTurn && moves[4] == playerTurn && moves[7] == playerTurn) {
      console.log(playerTurn + ' wins in column 2');
      freezeBoard();
    }
    else if (moves[2] == playerTurn && moves[5] == playerTurn && moves[8] == playerTurn) {
      console.log(playerTurn + ' wins in column 3');
      freezeBoard();
    }
    else if (counter == 8) {
      console.log("cats!");
      freezeBoard();
    }
    else {
      return;
    }
  };

});
