var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



function nextSequence(){
  // RESET ARRAY TO EMPTY EVERYTIME IT IS CALLED
  userClickedPattern = [];
  // PICK RANDOM NUMBER BETWEEN 0 AND 3
  var randomNumber = Math.floor(Math.random() * 4);
  // PICK RANDOM COLOR FROM ARRAY
  var randomChosenColour = buttonColours[randomNumber];
  // PUSH RANDOM COLOR TO GAME PATTERN ARRAY
  gamePattern.push(randomChosenColour);
  // MAKE RANDOM TILE FLASH BY OPACITY GO TO 0 THEN 100
  $("#" + randomChosenColour).fadeTo(280, 0, function(){
    // PLAY SOUND CONRESPONDING TO TILE
    playSound(randomChosenColour);
  $("#" + randomChosenColour).css("opacity", "100");
  // UPDATE LEVEL ON SCREEN
  level = level + 1;
  $("#level-title").html("Level" + " " + level )
});
}

// GET ID FROM PRESSED BUTTON
$(".btn").click(function(event){
 userChosenColour = event.target.id;
 // PUSH PRESS BUTTON ID INTO ARRAY
 userClickedPattern.push(userChosenColour);
 // PLAY SOUND WHEN TILE IS CLICKED
 playSound(userChosenColour);
 // ANIMATE PRESSED TILE BY PUSHING CLASS
 animatePressed(userChosenColour);
 // CHECK ANSWER
 checkAnswer(userClickedPattern.length-1)
});

function playSound(color){
  switch (color){
    case"red":
    var redSound = new Audio("sounds/red.mp3");
    redSound.play();
    break
    case"blue":
    var blueSound = new Audio("sounds/blue.mp3");
    blueSound.play();
    break
    case"green":
    var greenSound = new Audio("sounds/green.mp3");
    greenSound.play();
    break
    case"yellow":
    var yellowSound = new Audio("sounds/yellow.mp3");
    yellowSound.play();
    break
  }
}

function animatePressed(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}

$("body").on("keyup", function(){
  if (!started){
    $("body").off("keyup")
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence();
      }, 1000);

    }

  } else {
    $("body").addClass("game-over")
    $("h1").html("Game Over, Press Any Key to Restart")
    setTimeout(function(){
      $("body").removeClass("game-over")
      startOver()
    },200)
  }
}
function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
  $("body").on("keyup", function(){
    if (!started){
      $("body").off("keyup")
      nextSequence();
      started = true;
    }
  });
}
