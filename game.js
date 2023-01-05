
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];

var level = 0;

var startGame = true;

// Game
function nextSequence(){

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

//play audio function
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Event handler to add the color into the empty array
$(".btn").click(function(){
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(this);

  checkAnswer(userClickedPattern.length - 1);
});

//animation function
function animatePress(currentColour){

  $(currentColour).addClass("pressed");

  setTimeout(function(){
    $(currentColour).removeClass("pressed");
  }, 100);
}

// start the game
$(document).keydown(function (e) { 
  
  if ((e.key === "A" || e.key === "a") && startGame){
    nextSequence();
    $("h1").text("Level " + level);

    startGame = false;
  }
});

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if (gamePattern.length === userClickedPattern.length){

      setTimeout(function(){ nextSequence()}, 1000);
    }
  }

  else {   
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver(){

  level = 0;
  gamePattern = [];
  startGame = true;
}
