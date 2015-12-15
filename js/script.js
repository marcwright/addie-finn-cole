$(function() {

  var moves, counter, playerTurn, playerOne, playerTwo, players = [];

  var switchTurn = function(clickedCell) {
    if (playerTurn == players[0]) {
      $(clickedCell).addClass(playerTurn).css('background-size', 'contain');
      playerTurn = players[1];
      $('#playerTurnDiv').text(players[1] + "'s Turn!!");
      // $('#board').css('border', '10px solid blue');
    }
    else {
      $(clickedCell).addClass(playerTurn).css('background-size', 'contain');
      playerTurn = players[0];
      $('#playerTurnDiv').text(players[0] + "'s Turn!!");
      // $('#board').css('border', '10px solid red');
    };
  }

  var playerClick = function() {
    $(this).off("click").css('background-color', 'white');
    moves[parseInt($(this).attr('id'))] = playerTurn;
    counter++;
    console.log(counter, moves, playerTurn);

    if (counter > 4){ 
      winConditions();
    }

    switchTurn($(this));
  };

  var resetBoard = function() {
    moves = ['', '', '', '', '', '', '', '', ''];
    playerTurn = players[0];
    counter = 0;
    $('#playerTurnDiv').text(players[0] + "'s Turn!!");
    console.log(counter, moves, playerTurn);
    $('.cell').addClass('animated pulse')
      .on('click', playerClick).removeClass('Finnman Addie Coleman');
    // console.log("reset the board function");
    $('#container').fadeIn(2000);
    $('#startScreen').fadeOut(2000);
    $('#winnerDiv').hide();
  };

  var freezeBoard = function() {
    $('#board').addClass('animated hinge'),
      $('#winnerDiv').fadeIn(4000).addClass(playerTurn).css('background-size', 'contain')
      .html("<h1 class='animated wobble'>" + playerTurn + ' wins!</h1>');
      $('#playerTurnDiv').remove();
      // $('body').prepend()
      $('.resetButton').show().on('click', function(){
        window.location.reload();
      });    
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

  var choosePlayerOne = function() {
    $('#clickChoice').empty().delay(2000).text("Player #1, click your avatar!");
    
    $('.choice').on('click', function(){
      $(this).off("click").animate({"opacity": "0.5"});
      $('#this.id').prepend('<div style="border-top:50px">Player #1 is<br>' + this.id + '!</div>');
      players.push($(this).attr('id'));
      $('#clickChoice').text("Player #2, click on your avatar!");
      $(this).prepend('<p>Player #' + players.length + ' is<br>' + this.id + '!</p>');
      console.log(players);

      if (players.length == 2){
        $('#clickChoice').text(players[0] + " vs. " + players[1] + " Let's Play!!");
        setTimeout(function(){
          $('#clickChoice').addClass('animated bounceOut');
          resetBoard();
        }, 2000);
      }
    })
  };

  var startGame = function() {
    $('.resetButton').hide();
    $("#appBody").show();
    $('#container').hide();
    $('.choice').hide();
    $('#clickChoice').typed({
      strings: ["Welcome to Tic-Tac-Toe ^1000 <br> With Addie, Finn and Cole!"],
      typeSpeed: 1,
      showCursor: false,
      callback: function() {
        $('.choice').show().addClass('animated bounceInUp');
        $('#clickChoice').addClass('animated flash');
        setTimeout(function(){
          choosePlayerOne();}, 2000);
      }
    });    
  };

 
  startGame();

});
