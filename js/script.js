// $(function() {

  var moves, counter, playerTurn, playerOne, playerTwo, players = [], dieselChoice, dieselNum = 0, winDirection;
  
  var playerScores = {
    p1Score: 0,
    p2Score: 0,
    p1: '',
    p2: ''
  };
  
//Starts the game. It's called at the bottom of the script.
  var startGame = function() {
    console.log(playerScores);
    console.log('game started');
    //adding sound to an element
    $('body').on('click')
      // , function(){

    //   $(this).append('<embed src="http://www.freesfx.co.uk/rx2/mp3s/9/11105_1393961054.mp3" autostart="true" width="1" height="1" id="LegacySound" enablejavascript="true">');
    // });
    $('.resetButton').hide();
    $("#appBody").show();
    $('#container').hide();
    $('.choice').hide();
    console.log('line 17 before typed');
    $('#clickChoice').show().typed({
      strings: ["Welcome to Tic-Tac-Toe ^1000 <br> With Addie, Finn and Cole!"],
      typeSpeed: 1,
      showCursor: false,
      callback: function() {
        $('.choice').show().addClass('animated bounceInUp');
        
        setTimeout(function(){
          $('.choice').removeClass('animated bounceInUp');
          $('#clickChoice').addClass('animated flash');          
          choosePlayerOne();
        }, 1000);

        // setTimeout(function(){
        //   // choosePlayerOne();
        // }, 1000);
      }
    });
    console.log('line 34'); 
  };
  
//Lets the player choose his/her avatar.
  var choosePlayerOne = function() {
    $('#clickChoice').empty().delay(2000).text("Player #1, click your avatar!");
    
    $('.choice').on('click', function(){
      players.push($(this).attr('id'));
     
     $('#clickChoice').text("Player #2, click on your avatar!");
      $(this).prepend("<div class='animated wobble' style='background-color:rgba(4,0,0, 0.3); border-radius: 25px; color:white'>Player #" + players.length + ' is<br>' + this.id + '!</div>');
      playerScores.p1 = players[0];
      playerScores.p2 = players[1];
      console.log(players, playerScores);

      //if Diesel (computer is chosen)
      //Prepping for AI/Diesel logic
      if (players.length == 2 && players.indexOf('Diesel') > -1){
        $('#clickChoice').text(players[0] + " vs. " + players[1] + " You're playing the computer!!");
        setTimeout(function(){
          $('#clickChoice').addClass('animated bounceOut');
          gamePlay();
        }, 2000);
      } else if(players.length == 2) {
       //if Diesel is not chosen 
        $('#clickChoice').text(players[0] + " vs. " + players[1] + " Let's Play!!");
        setTimeout(function(){
          $('#clickChoice').addClass('animated bounceOut');
          gamePlay();
        }, 2000);
      }
    })
  };

  var updateScoresDiv = function(){
    $('#p1ScoreDiv').html("<div>" + players[0] + "<br>" + playerScores.p1Score + "</div>");
    $('#p2ScoreDiv').html("<div>" + players[1] + "<br>" + playerScores.p2Score + "</div>");
  }

  //game play logic
  var gamePlay = function() {
    moves = ['', '', '', '', '', '', '', '', ''];
    playerTurn = players[0];
    counter = 0;

    updateScoresDiv();

    $('#playerTurnDiv').show().text(players[0] + "'s Turn!!");
    console.log(counter, moves, playerTurn, players);
    
    $('.cell').empty().removeClass().removeAttr('style').addClass('cell detox animated pulse')
      .on('click', playerClick);
          
    $('#container').fadeIn(2000);
    $('#board').fadeIn(2000);
    $('#startScreen').fadeOut(2000);
    $('#winnerDiv').removeClass().hide();
  
    //when a player clicks a cell
    function playerClick() {
      $(this).off("click").css('background-color', 'white');
      moves[parseInt($(this).attr('id'))] = playerTurn;
      counter++;
      console.log(counter, moves, playerTurn);

      if (counter > 4){ 
        winConditions();
      }
      switchTurn($(this));
    };

    //switches turns
    function switchTurn(clickedCell) {
      if (playerTurn == players[0]) {
        $(clickedCell).addClass(playerTurn).css('background-size', 'contain');
        playerTurn = players[1];
        $('#playerTurnDiv').text(players[1] + "'s Turn!!");
      } else {
        $(clickedCell).addClass(playerTurn).css('background-size', 'contain');
        playerTurn = players[0];
        $('#playerTurnDiv').text(players[0] + "'s Turn!!");
      };
    };
    
  };

  var winnerIs = function() {

    if (playerTurn == playerScores.p1) {
      playerScores.p1Score++;
    } else {
      playerScores.p2Score++;
    }

    updateScoresDiv();


    console.log(playerScores.p1 + " has " + playerScores.p1Score + ", " + playerScores.p2 + " has " + playerScores.p2Score) 
    

    $('.' + playerTurn),
    $('#board').fadeOut(2000),
    $('.cell').off('click'),
    //adds custom win audio message
    $('body').append("<embed src='mp3/" + playerTurn + ".mp3' autostart='true' width='1' height='1' id='LegacySound' enablejavascript='true'>"),
      $('#winnerDiv').delay(1000).fadeIn(2000).addClass(playerTurn + ' detox').css('background-size', 'contain').html("<div style='background-color:rgba(4,0,0, 0.2); border-radius: 25px; margin-top: 200px'><h1 class='animated wobble'>" + playerTurn + winDirection + '!</h1></div>');
      $('#playerTurnDiv').hide();
      console.log(winDirection);

      $('.resetButton').off('click').show().on('click', gamePlay);
  };

  var winConditions = function() {
    if (moves[0] == playerTurn && moves[1] == playerTurn && moves[2] == playerTurn) {
      winDirection = ' wins on row 1';
    } else if (moves[3] == playerTurn && moves[4] == playerTurn && moves[5] == playerTurn) {
      winDirection = ' wins on row 2';
    } else if (moves[6] == playerTurn && moves[7] == playerTurn && moves[8] == playerTurn) {
      winDirection = ' wins on row 3';
    } else if (moves[0] == playerTurn && moves[4] == playerTurn && moves[8] == playerTurn || moves[2] == playerTurn && moves[4] == playerTurn && moves[6] == playerTurn) {
      winDirection = ' wins on the diagonal';
    } else if (moves[0] == playerTurn && moves[3] == playerTurn && moves[6] == playerTurn) {
      winDirection = ' wins in column 1';
    } else if (moves[1] == playerTurn && moves[4] == playerTurn && moves[7] == playerTurn) {
      winDirection = ' wins in column 2';
    } else if (moves[2] == playerTurn && moves[5] == playerTurn && moves[8] == playerTurn) {
      winDirection = ' wins in column 3';
    } else if (counter == 9) {
      winDirection = ' Game... No one wins';
      playerTurn = 'Cat';
      console.log("cats!");
    } else {
      return;
    }
    winnerIs();
  };
  
  //on load this starts the game
  startGame();