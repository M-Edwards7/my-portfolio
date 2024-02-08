const gamePattern = [];
const userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;


//generate random sequence
function nextSequence() {
    gameStarted = true;
    const randomNum = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNum];

    gamePattern.push(randomChosenColor);
    // console.log(randomChosenColor)
    $(`#${randomChosenColor}`).fadeOut().fadeIn();

    playSound(randomChosenColor);
    level++
    $("#level-title").text(`Level ${level}`)
    // user choice array reset
    userClickedPattern.length = 0;

    // console.log(gamePattern)
}
//play sound
function playSound(color) {
    const sound = new Audio(`./sounds/${color}.mp3`);
    sound.play();
}
// buttons clicked
$(".btn").on("click", function () {
    const userChosencolor = this.id;
    userClickedPattern.push(userChosencolor);

    playSound(userChosencolor);
    animatePress(userChosencolor);
    // console.log(userClickedPattern)
    const lastInput = userClickedPattern.length - 1
    // console.log(lastInput, userClickedPattern)
    checkAnswer(lastInput)

});
function checkAnswer(currentIndex) {
    if (userClickedPattern[currentIndex] !== gamePattern[currentIndex]) {
        gameOver();
        // console.log('wrong choice')
    }
    if (gamePattern.length !== 0) {
        if (userClickedPattern.length === gamePattern.length) {
            // console.log('right choice')
            setTimeout(nextSequence, 1000);
        }
    }
}
//add animations to user clicks
function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed"); setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed")
    }, 100);
}

// start the game
$('.start-button').on("click", function () {
    if (!gameStarted) {
        $("#level-title").text(`Level ${level}`)
        nextSequence();
        $(".start-button").text("Reset Game")
        gameStarted = true
    }
});

// - each turn gamePattern array adds another item
// - each turn user clickedPattern emptys
// - each turn check to arrarys to make sure they match
// - if array[n] doesnt match then game over
//     - game over screen background color flashes red and plays ./sound/wrong.mp3
// ------------------------------------------------------
//     game loop
// ------------------------------------------------------
// -  game starts
// - color added to game array
// - user clicks
// - color added to user choice array
// - check to see position[n] of both arrays are the same

//game over function
function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over"); setTimeout(() => {
        $("body").removeClass("game-over")
    }, 500);
    $("#level-title").text("Game Over, Restart button to Restart!!");
    restartGame();
}
function restartGame() {
    gameStarted = false;
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
}

// write a function that 
// - takes the index of the last value of the userClickedPattern array
//  - uses that index to compare value of both arrays at same index
// - if they are not equal then run game over 