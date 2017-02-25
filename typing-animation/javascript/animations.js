// @author: gupta.pavitra@gmail.com

// Remove all console.log functions in order to understand the functionality.
// Whole animation is divided in three parts.
// 1. Typing the letters.
// 2. Pause once the word is completely typed.
// 3. Deleting the letters.

// Initialize an empty word list
wordList = [];

$(document).ready(function() {
    fillWordList();

    wordNumber = 0;
    maxWordNumber = wordList.length - 1;
    currentNumberOfCharacters = 0;
    wordToShow = "";
    word = wordList[wordNumber];
    totalNumberOfCharacters = word.length;

    startTypingInterval();


    // Fill wordList with elements provided in html
    function fillWordList() {
        $('.typed-strings').children().each(function() {
            wordList.push(this.innerHTML);
        });
    }

    function setWordSpecifics() {
        word = wordList[wordNumber];
        totalNumberOfCharacters = word.length;
    }

    // Navigate to the next word number in the wordList array
    function nextWord() {
        if (wordNumber < maxWordNumber) {
            wordNumber = wordNumber + 1;
        } else if (wordNumber == maxWordNumber) {
            wordNumber = 0;
        }

        setWordSpecifics();
        startTypingInterval();
    }

    // Responsible for typing the letters of the word
    function startTypingInterval() {
        var typingInterval = window.setInterval(function() {
            if (currentNumberOfCharacters < totalNumberOfCharacters) {
                currentNumberOfCharacters = currentNumberOfCharacters + 1;
                wordToShow = word.substring(0, currentNumberOfCharacters);

                // console.log(wordToShow);

                $('.typed').html(wordToShow);
            } else if (currentNumberOfCharacters == totalNumberOfCharacters) {
                window.clearInterval(typingInterval);
                startPausingTimeout();
            }
        }, 150);
    }


    // Responsible for the pause after the word completes
    function startPausingTimeout() {
        window.setTimeout(function() {
            // console.log("Pausing..");
            startDeletingInterval();
        }, 1000);
    }

    // Responsible for clearing the word after the pause
    function startDeletingInterval() {
        var deletingInterval = window.setInterval(function() {
            if (currentNumberOfCharacters > 0) {
                currentNumberOfCharacters = currentNumberOfCharacters - 1;
                wordToShow = word.substring(0, currentNumberOfCharacters);

                // console.log(wordToShow);

                $('.typed').html(wordToShow);
            } else if (currentNumberOfCharacters == 0) {
                window.clearInterval(deletingInterval);
                nextWord();
            }
        }, 150);
    }
});