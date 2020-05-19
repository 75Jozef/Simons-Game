
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var level = 0;

$(document).on('keypress',function() {

if (started === false) {

  nextSequence();
}
  });

function nextSequence() {
  userClickedPattern = [];
  started = true;
  $("h1").text("Level "+level);
  level++;
  var randomNumber = (Math.floor(Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut("slow").fadeIn("slow");
  playSound(randomChosenColour);
  }

$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var userClickNumber = userClickedPattern.length;

  checkAnswer(userClickNumber);

      });


function playSound (name) {
  var zvuk = (name+".mp3");
  console.log(zvuk);
  var audio = new Audio("sounds/"+zvuk);
  console.log(audio);
  audio.play();
}

function animatePress(currentColour) {
$("#"+currentColour).addClass("pressed");
setTimeout(function(){ $("#"+currentColour).removeClass("pressed");  }, 100);
}





function checkAnswer(currentLevel) {

var user = userClickedPattern[currentLevel-1];
var game = gamePattern[currentLevel-1];

if (user === game) {
  if (userClickedPattern.length === gamePattern.length) {

    setTimeout(function(){ nextSequence(); }, 1000);
  }

 }
else {
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){ $("body").removeClass("game-over"); }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");
startOver();

}
}

function startOver () {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
