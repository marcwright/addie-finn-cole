// $(function() {

  var moves, counter, playerTurn, playerOne, playerTwo, players = [], dieselChoice, dieselNum, winDirection;
  
//Starts the game. It's called at the bottom of the script.
  var startGame = function() {
    console.log('game started');
    //adding sound to an element
    // $('body').on('click', function(){

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
      $(this).prepend("<div class='animated wobble' style='background-color:rgba(4,0,0, 0.4); border-radius: 25px; color:white'>Player #" + players.length + ' is<br>' + this.id + '!</div>');
      console.log(players);

      //if Diesel (computer is chosen)
      //Prepping for AI/Diesel logic
      if (players.length == 2 && players.indexOf('Diesel') > -1){
        $('#clickChoice').text(players[0] + " vs. " + players[1] + " You're playing the computer!!");
        setTimeout(function(){
          $('#clickChoice').addClass('animated bounceOut');
          aiGamePlay();
        }, 2000);
      } else if(players.length == 2){
       //if Diesel is not chosen 
        $('#clickChoice').text(players[0] + " vs. " + players[1] + " Let's Play!!");
        setTimeout(function(){
          $('#clickChoice').addClass('animated bounceOut');
          gamePlay();
        }, 2000);
      }
    })
  };

  //game play logic
  var aiGamePlay = function() {
    moves = ['', '', '', '', '', '', '', '', ''];
    playerTurn = players[0];
    counter = 0;
    
    $('#playerTurnDiv').text(players[0] + "'s Turn!!");
    console.log('Diesel aiGamePlay: ' + ' ' + counter + ' ' + moves + ' ' + playerTurn + ' ' + players);
    
    $('.cell').empty().removeClass().removeAttr('style').addClass('cell detox animated pulse')
      .on('click', playerClick);
          
    $('#container').fadeIn(2000);
    $('#board').fadeIn(2000);
    $('#startScreen').fadeOut(2000);
    $('#winnerDiv').removeClass().hide();
  
    //when a player clicks a cell
    function playerClick() {


      $(this).off("click").css('background-color', 'white').addClass(players[0]).css('background-size', 'contain');
      moves[parseInt($(this).attr('id'))] = players[0];
      playerTurn = players[1];
      counter ++;
      console.log(counter, moves, playerTurn);

      if (counter > 4){
        winConditions();
      };
      //Diesel/AI Move
      dieselNum = (Math.floor(Math.random()*10) -1);
      console.log(dieselNum + " line 95");
      if (moves[dieselNum] == '') {
        moves[dieselNum] = 'Diesel';
        counter++;
        playerTurn = players[0];
      } else {
        dieselNum = Math.floor(Math.random()*10);
        console.log(dieselNum + " line 107");
        moves[dieselNum] = 'Diesel';
        counter++;
        playerTurn = players[0];
      };

      // dieselNum = Math.floor(Math.random()*10);
      // moves[dieselNum] = 'Diesel';
      dieselChoice = $('#' + dieselNum);  //grabbing the cell with the id of number diesel
      dieselChoice.off("click").css('background-color', 'white').addClass("Diesel").css('background-size', 'contain');
      console.log("Diesel's move " + dieselChoice.id + "counter: " + counter);


    };    
  };

  //game play logic
  var gamePlay = function() {
    moves = ['', '', '', '', '', '', '', '', ''];
    playerTurn = players[0];
    counter = 0;
    
    $('#playerTurnDiv').text(players[0] + "'s Turn!!");
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
    $('.' + playerTurn),
    $('#board').fadeOut(2000),
    $('.cell').off('click'),
      $('#winnerDiv').delay(1000).fadeIn(2000).addClass(playerTurn + ' detox').css('background-size', 'contain')
      .html("<div style='background-color:rgba(4,0,0, 0.4); border-radius: 25px; margin-top: 200px'><h1 class='animated wobble'>" + playerTurn + winDirection + '!</h1></div>');
      $('#playerTurnDiv').remove();
      console.log(winDirection);

      $('.resetButton').off('click').show().on('click', gamePlay);
      //   function(){
      //   console.log('line 117');
      //   // $('#startScreen').empty().fadeIn();
      //   // $('#appBody').append($('#startScreen'));
      //   // return startGame();
      //   window.location.reload();
      // });    
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
    console.log("checked win condition");
    winnerIs();
  };
  
  //on load this starts the game
  startGame();

// });

  //working on AI logic here

  //     dieselNum = Math.floor(Math.random()*10); //getting a random number to pick a cell
  //       if (moves[dieselNum] === '') {
  //         dieselChoice = $('#' + dieselNum);  //grabbing the cell with the id of number diesel
  //         moves[dieselNum] = 'Diesel';
  //         dieselChoice.off("click").css('background-color', 'white'); //turning off click on that cell
  //         counter++;
  //         console.log(counter, moves, playerTurn, dieselChoice, "Disel Num = " + dieselNum);
  //         switchTurn(dieselChoice);
  //       } else {
  //         console.log("Diesel Else line 93");
  //         dieselNum = Math.floor(Math.random()*10);
  //         dieselChoice = $('#' + dieselNum);  //grabbing the cell with the id of number diesel
  //         moves[dieselNum] = 'Diesel';
  //         dieselNum = 0;
  //         dieselChoice.off("click").css('background-color', 'white'); //turning off click on that cell
  //         counter++;
  //         console.log(counter, moves, playerTurn, dieselChoice, "Disel Num = " + dieselNum);
  //         switchTurn(dieselChoice);
  //       };


  //   } else {
  //     console.log('line 109');
  //     $('.cell').on('click', function(){
  //       $(this).off("click").css('background-color', 'white');
  //       moves[parseInt($(this).attr('id'))] = playerTurn;
  //       console.log(counter, moves, playerTurn);
  //       counter++;
  //       switchTurn($(this));
  //     });
  //   }
  //     // $(this).off("click").css('background-color', 'white');
  //     // moves[parseInt($(this).attr('id'))] = playerTurn;
  //     // counter++;
  //     // console.log(counter, moves, playerTurn);

  //     // if (playerTurn == 'Diesel'){
  //     //   diesel = Math.floor(Math.random()*10);
  //     //   moves[diesel] = "Diesel";
  //     //   console.log('line 91 + ' + diesel);
  //     //   dieselChoice = $('#' + diesel);
  //     //   dieselChoice.off("click").css('background-color', 'white');
  //     //   console.log("line 96" + counter, moves, playerTurn);
  //     //   console.log(dieselChoice);
  //     //   switchTurn(dieselChoice);
  //     // } else {
  //     //   switchTurn($(this));
  //     //   console.log($(this));
  //     // }

  //     if (counter > 4){ 
  //       winConditions();
  //     }
  // };
