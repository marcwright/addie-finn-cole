$(function(){

  var moves, counter, playerTurn;

  var switchTurn = function(clickedCell){
    if (playerTurn == 'X'){   
      playerTurn = 'O';
      $('#board').css('border', '10px solid blue');
      $(clickedCell).addClass('red').text('Addie');      
    } else {
      playerTurn = 'X';
      $('#board').css('border', '10px solid red');
      $(clickedCell).addClass('blue').text('Finnman');
    };  
  }

  var playerClick = function(){
    $(this).unbind("click");
    moves[parseInt($(this).attr('id'))] = playerTurn;
    counter++;
    console.log(counter, moves, playerTurn);
    winConditions();
    switchTurn($(this));  
  }; 

  var resetBoard = function(){
    moves = ['','','','','','','','',''];
    playerTurn = 'X';
    counter = 0;
    console.log(counter, moves, playerTurn);
    $('.cell').on('click', playerClick).removeClass('red blue').html('');
    console.log("reset the board function");
    // $('.cell').on('click', playerClick);
    $('#board').show().css('border', '10px solid green');
    $('#winnerDiv').hide();
  };

  var freezeBoard = function(){
    $('#board').fadeOut(2000),
    $('#winnerDiv').fadeIn(4000)
      .html('<h1>' + playerTurn + ' is the winner!</h1>')
      return
    };

  var winConditions = function(){
    if (moves[0] == playerTurn && moves[1] == playerTurn && moves[2] == playerTurn){
      console.log(playerTurn + ' wins on row 1');
      freezeBoard();
    } else if (moves[3] == playerTurn && moves[4] == playerTurn && moves[5] == playerTurn){
      console.log(playerTurn + ' wins on row 2');
      freezeBoard();
    } else if (moves[6] == playerTurn && moves[7] == playerTurn && moves[8] == playerTurn){
      console.log(playerTurn + ' wins on row 3');
      freezeBoard();
    } else if (moves[0] == playerTurn && moves[4] == playerTurn && moves[8] == playerTurn || moves[2] == playerTurn && moves[4] == playerTurn && moves[6] == playerTurn){
      console.log(playerTurn + ' wins on the diagonal');
      freezeBoard();
    } else if (moves[0] == playerTurn && moves[3] == playerTurn && moves[6] == playerTurn){
      console.log(playerTurn + ' wins in column 1');
      freezeBoard();
    } else if (moves[1] == playerTurn && moves[4] == playerTurn && moves[7] == playerTurn){
      console.log(playerTurn + ' wins in column 2');
      freezeBoard();
    } else if (moves[2] == playerTurn && moves[5] == playerTurn && moves[8] == playerTurn) {
      console.log(playerTurn + ' wins in column 3');
      freezeBoard();
    } else if (counter == 8) {
      console.log("cats!");
      freezeBoard();
    } else {
      return;
    }
  };
  
  // $('.cell').on('click', playerClick);
  $('#resetButton').on('click', resetBoard);
  $('#winnerDiv').hide();
});