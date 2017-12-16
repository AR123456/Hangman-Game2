//Global Variables 
//Arrays and variables
//Array of word list
var  wordList = ["amygdala","cortex ","sagittal","chiasm ","gyrus","nerve","brain","horn","cell","occipital","axon","atlas","ataxia","dendrite","diplopia","babinski","medulla","vertigo","uncus","glia","skin","dendrite","skin","proprioception","neuron"];
var currentWord = ""; // for each letter here create a corresponding blank in the uncerscore array
var matchingLetters= []; //holds the matching letters 
var numBlanks =0; //number of letters in word
var underscoreWord = []; //where blanks will be to be replaced with correct guesses 
var badGuess =[];//store here for dsplay in already guessed area and check for already use 
var emoji = document.createElement('img'); //for the sad and happy face



//Game counters 
var winCount =0;
var lossCount = 0;
var guessesLeft = 9;//this will decrease with each wrong guess dont accept repeats 
//Functions 
 // This function is run whenever the user presses a key. It needs to happen just once to generate the work then the key click needs to be a guess 
function startGame() {
    currentWord = wordList[Math.floor(Math.random()* wordList.length)];//random generates word from the list from the options array. This is the computer generating the word for the game.
    matchingLetters = currentWord.split("");
    numBlanks = matchingLetters.length;

    // Reset globals 
    guessesLeft = 9;
    badGuess =[];
    underscoreWord = [];
//the for loop to populate underscoredWord
for ( var i=0; i<numBlanks; i++){
    underscoreWord.push("_");
    }
//sending to HTML
document.getElementById("underscoreWord").innerHTML = underscoreWord.join("  ");
document.getElementById("guessesLeft").innerHTML = guessesLeft;
document.getElementById("winCounter").innerHTML = winCount;
document.getElementById("lossCount").innerHTML = lossCount;

    //Test build in console 
    console.log(currentWord);
    console.log(matchingLetters);
    console.log(numBlanks);
    console.log(underscoreWord);

}

function checkLetters(letter){
        //check if letter exists 
        var isLetterInWord = false;

        for (var i=0; i<numBlanks; i++){
            if(currentWord[i] ==letter){
                isLetterInWord = true;
            }
        }

    //check where in word the letter is an if not go to bad guess
    if (isLetterInWord){
    for (var i=0; i<numBlanks; i++){
        if(currentWord[i] ==letter){
            underscoreWord[i] =letter;
        }
    }
    } 
    //else if letter was not found
    else{
        badGuess.push(letter);
        guessesLeft--;
    }
//test build 
    console.log(underscoreWord);

}


function roundComplete(){
    console.log("Win Count:" + winCount + "|Loss Count: " + lossCount + "|Guesses Left" + guessesLeft );
  //update the HTML to reflect teh most recent cout 
document.getElementById("guessesLeft").innerHTML=guessesLeft;
document.getElementById("underscoreWord").innerHTML= underscoreWord.join("  ");
document.getElementById("wrongGuesses").innerHTML = badGuess.join("  ");

    // Check if user won 
    if(matchingLetters.toString() == underscoreWord.toString()){
        winCount ++;
    //emojilogic 
    emoji.src = './assets/images/grinningFace.png';
    emoji.setAttribute('style', 'z-index: 1;');
    document.getElementById('face').appendChild(emoji);

        
        // send to the win counter in HTML
        document.getElementById("winCounter").innerHTML = winCount;
        setTimeout(function(){
            alert("You Won! The word is : " + currentWord );
            startGame();
        },1000)
      
    }
    // check if user lost 
    else if (guessesLeft == 0) {
        lossCount++;
       // emojiLogic();
       emoji.src = './assets/images/dizzyFace.png';
       emoji.setAttribute('style', 'z-index: 1;');
       document.getElementById('face').appendChild(emoji);
              
        alert ("You lost! The correct word was: " + currentWord );
        // send loss to counter in HTML
        document.getElementById("lossCount").innerHTML = lossCount;
        startGame(); 
    }
}

//Starting game 
// initiates the code the firs time 
startGame();

// Register Keyclicks 
document.onkeyup = function (event){
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
        //testing
        console.log(letterGuessed);

}
