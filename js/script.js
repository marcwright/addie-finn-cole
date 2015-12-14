$(function() {

  var moves, counter, playerTurn, playerOne, playerTwo, players = [];

  var switchTurn = function(clickedCell) {
    if (playerTurn == players[0]) {
      playerTurn = players[1];
      $('#playerTurnDiv').text(players[0] + "'s Turn!!");
      // $('#board').css('border', '10px solid blue');
      $(clickedCell).addClass(playerTurn).css('background-size', 'contain');
    }
    else {
      playerTurn = players[0];
      $('#playerTurnDiv').text(players[1] + "'s Turn!!");
      // $('#board').css('border', '10px solid red');
      $(clickedCell).addClass(playerTurn).css('background-size', 'contain');
    };
  }

  var playerClick = function() {
    $(this).unbind("click").removeClass('animated infinite pulse');
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
    $('.cell').addClass('animated pulse')
      .on('click', playerClick).removeClass('Finnman Addie Coleman');
    console.log("reset the board function");
    $('#container').fadeIn(2000);
    $('#startScreen').fadeOut(2000);
    // $('#board').show().css('border', '10px solid green');
    $('#winnerDiv').hide();
  };

  var freezeBoard = function() {
    $('#board').addClass('animated hinge'),
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

  var choosePlayerOne = function() {
    // $('#clickChoice').typed({
    //   strings: ["Welcome to Tic-Tac-Toe ^2000 <br> With Addie, Finn and Cole!"],
    //   typeSpeed: 10,
    //   showCursor: false,
    //   callback: function() {
    //     $('.choice').show().addClass('animated bounceInUp');
    //   }
    // });

    // $('#clickChoice').typed({
    //     strings: ["Player #1 choose your avatar!"],
    //     typeSpeed: 5,
    //     showCursor: false
    //   });    

    $('#clickChoice').empty().delay(2000).text("Player #1, click your avatar!");
    $('.choice').on('click', function(){
      $(this).off("click").animate({"opacity": "0.5"});
      $(this).append('<p>Player #1 is<br>' + this.id + '!</p>');
      players.push($(this).attr('id'));
      console.log(players);
      $(this) = '';
      return choosePlayerTwo();
    })
  };

    function choosePlayerTwo() {
      $('#clickChoice').text("Player #2, click on your avatar!");

      $('.choice').on('click', function(){
        $(this).off("click").animate({"opacity": "0.5"});
        console.log(this.id)
        $(this).append('<p>Player #2 is<br>' + this.id + '!</p>');
        $('#clickChoice').text("Let's Play!!").removeClass().addClass('animated bounceOut');
        p2 = $(this).attr('id');
        players.push(p2);
        console.log(players);
        setTimeout(function(){
          resetBoard();}, 2000);
      })
    };

  function startGame() {
    $('#container').hide();
    $('.choice').hide();
    $('#clickChoice').typed({
      strings: ["Welcome to Tic-Tac-Toe ^2000 <br> With Addie, Finn and Cole!"],
      typeSpeed: 5,
      showCursor: false,
      callback: function() {
        $('.choice').show().addClass('animated bounceInUp');
        $('#clickChoice').addClass('animated flash');
        setTimeout(function(){
          choosePlayerOne();}, 2000);
      }
    });
    
  };

  $('#resetButton').on('click', resetBoard);
 
  startGame();

});
