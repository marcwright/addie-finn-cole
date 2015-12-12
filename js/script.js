$(function() {

  var moves, counter, playerTurn, playerOne, playerTwo, players = [];

  var switchTurn = function(clickedCell) {
    if (playerTurn == players[0]) {
      playerTurn = players[1];
      $('#playerTurnDiv').text(players[0] + "'s Turn!!");
      $('#board').css('border', '10px solid blue');
      $(clickedCell).addClass(playerTurn).css('background-size', '100%');
    }
    else {
      playerTurn = players[0];
      $('#playerTurnDiv').text(players[1] + "'s Turn!!");
      $('#board').css('border', '10px solid red');
      $(clickedCell).addClass(playerTurn).css('background-size', '100%');
    };
  }

  var playerClick = function() {
    $(this).unbind("click");
    moves[parseInt($(this).attr('id'))] = playerTurn;
    counter++;
    console.log(counter, moves, playerTurn);
    winConditions();
    switchTurn($(this));
  };

  var resetBoard = function() {
    moves = ['', '', '', '', '', '', '', '', ''];
    playerTurn = players[0];
    counter = 0;
    $('#playerTurnDiv').text(players[0] + "'s Turn!!");
    console.log(counter, moves, playerTurn);
    $('.cell').on('click', playerClick).removeClass('Finnman Addie Coleman');
    console.log("reset the board function");
    $('#container').fadeIn(2000);
    $('#startScreen').fadeOut(2000);
    $('#board').show().css('border', '10px solid green');
    $('#winnerDiv').hide();
  };

  var freezeBoard = function() {
    $('#board').fadeOut(2000),
      $('#winnerDiv').fadeIn(4000).addClass(playerTurn).css('background-size', '100%')
      .html('<h1>' + playerTurn + ' is the winner!</h1>')
    return
  };

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

  function choosePlayerOne() {
    $('#clickChoice').text("Player one, click on your Avatar!");

    $('.choice').on('hover', function(){
      $(this).addClass('animated pulse');
    });

    $('.choice').on('click', function(){
      $(this).unbind("click");
      players.push($(this).attr('id'));
      console.log(players);
      choosePlayerTwo();
    })
  };

    function choosePlayerTwo() {
      $('#clickChoice').text("Player two, click on your Avatar!");

      $('.choice').on('click', function(){
        $(this).unbind("click");
        players.push($(this).attr('id'));
        console.log(players);
        resetBoard();
      })
    };

  function startGame() {
    $('#container').hide();
    choosePlayerOne();
  };

  $('#resetButton').on('click', resetBoard);
 
  startGame();

});
