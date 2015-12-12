$(function(){

  var moves = ['','','','','','','','',''], counter = 0, playerTurn = 'X';

  var freezeBoard = function(){
    $('.cell').unbind('click');
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
    } else if (counter == 9) {
      console.log("cats!");
    } else {
      return;
    }
  };

  var switchTurn = function(clickedCell){
    if (playerTurn == 'X'){   
      playerTurn = 'O';
      return function(){
        $('#board').css('border', '10px solid red');
        /*$(clickedCell).addClass('red').text('Addie');*/
      }      
    } else {
      playerTurn = 'X';
      return function(){
        $('#board').css('border', '10px solid blue');
        /*$(clickedCell).addClass('blue').text('Finnman');*/
      };      
    };  
  }

  var playerClick = function(){
    $(this).unbind("click");
    counter++;
    moves[parseInt($(this).attr('id'))] = playerTurn;
    console.log(counter, moves);
    winConditions();
    switchTurn($(this));  
  }; 

  var resetBoard = function(){
    moves = ['','','','','','','','',''];
    playerTurn = 'X';
    counter = 0;
    $('.cell').removeClass('red blue').html('');
    console.log("reset the board function");
    $('.cell').on('click', playerClick);
  };

  $('.cell').on('click', playerClick)
  $('#resetButton').on('click', resetBoard)



});