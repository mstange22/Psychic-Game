
var wins = 0;
var losses = 0;
var guesses = 9;

var letters = ["a", "b", "c", "d", "e", "f", "g",
               "h", "i", "j", "k", "l", "m", "n",
               "o", "p", "q", "r", "s", "t", "u",
               "v", "w", "x", "y", "z"];

var guessedLetters = [];
var guessesString = "";

// Chose the first letter randomly
var computerLetter = letters[Math.floor(Math.random() * letters.length)];

// reset function for new game
function reset() {

    guessedLetters = [];
    guessesString = "";
    guesses = 9;
    computerLetter = letters[Math.floor(Math.random() * letters.length)];

    var initialHTML =  "<p>Wins: " + wins + "</p>" +
                        "<p>Losses: " + losses + "</p>" +
                        "<p>Guesses Left: 9</p>" +
                        "<p>Your Guesses so far: </p>";                  

    // Set the inner HTML contents of the #game div to the html string
    $("#game").html(initialHTML);
}

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;

    // check for valid input?
    if (letters.indexOf(userGuess) === -1) {

        alert("Input must be a letter!");
    }

    else {

        // if letter has not already been guessed
        if (guessedLetters.indexOf(userGuess) === -1) {

            // check to see if guess was right
            if(userGuess === computerLetter) {

                // alert(userGuess + " was my letter.  You win!");
                wins++;
                setTimeout(reset, 1000);reset();
            }

            // not a win
            else {

                guesses--;

                // check to see if all guesses have been used
                if (guesses === 0) {

                    // alert("You used all of your guesses. " +
                    //     computerLetter + " was my letter.  You lose.");
                    losses++;
                    setTimeout(reset, 1000);reset();
                }

                else {

                    // add guess to guessedLetters
                    guessedLetters.push(userGuess);

                    // if this is not the first guessed letter...
                    if (guessesString.length) {

                    // ...add ", "before guessed letter
                    guessesString = guessesString.concat(", ");

                    }

                    // add guess to the string of guesses
                    guessesString = guessesString.concat(userGuess);
                }
            }
        }

        // build text to display in the div #game
        var html =  "<p>Wins: " + wins + "</p>" +
                    "<p>Losses: " + losses + "</p>" +
                    "<p>Guesses Left: " + guesses + "</p>" +
                    "<p>Your Guesses so far: " + guessesString + "</p>";                  

        // Set the inner HTML contents of the #game div to the html string
        $("#game").html(html);
    }
};

$("#button").on("click", function() {
    wins = 0;
    losses = 0;
    reset();
    $("#start-prompt").html("Guess what letter I'm thinking of");
    $("#start-prompt-2").html("\(Press any key to guess\)");
    $("#button").html("Reset Score");
});
