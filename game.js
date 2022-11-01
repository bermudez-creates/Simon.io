var buttonColors = ["red" , "blue" , "green" , "yellow"]; //buttonColors[1]==red
var gamePattern = [];//computer moves
var playerMoves = [];

var level = 0;
var start = false;

$(document).keypress(function() {  //wait for key press to start/restart
    if (!start) {
        $("#level-title").text("Level" + level);
        nextSequence();
        start = true;
    }
});


$(".btn").click(function() {  
 //captures player clicks
    var chosenColor = $(this).attr('id');  
    playerMoves.push(chosenColor);  //pushes player clicks into player moves array
    playSound(chosenColor);
    animatePress(chosenColor);
    checkAnswer(playerMoves.length-1);
    
});

function nextSequence() {    //creates random number/chooses from color array
    playerMoves = [];  
    level++;   
    $("#level-title").text("Level " + level);                     //random sequence
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColor = buttonColors[randomNumber]; //return a string color value
    gamePattern.push(randomChosenColor); // how random number picks from array
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //passes in string color/picks a button to animate from html
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === playerMoves[currentLevel]) { //1. checks if random pattern = player pattern after start
      if (playerMoves.length === gamePattern.length){  //2. if pattern is chosen correctly do this...
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {  //if wrong do this...
      $("body").addClass("game-over");
      playSound(wrong);
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      gameOver();
    }
}
  function gameOver () {  //resets game 
    $("#level-title").text("Game Over! Press any key to restart!");
   
    level = 0;
    gamePattern = [];
    start = false;
  }

//we set these functions to call on behavior on the fly 
//how do we make the right sound+animation play when a certain number
//is picked? We call on these in our earlier scripts as the maxhine runs through them 

function playSound(name) {                       //how we get the corresponding sound to the color chosen/picked                         //should play sound on random/chosen sequence
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');   //animates buttons chosen/picked
  setTimeout(function() {
    $( '#' + currentColor).removeClass('pressed')}
    , 200);
  }

  


  


 
   

