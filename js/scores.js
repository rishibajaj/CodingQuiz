//query selectors
let highscoresList = document.querySelector("#highscores");
let clearButton = document.querySelector("#clear");

//retrieve previous stores from local storage
const storedScoresArray = JSON.parse(localStorage.getItem("scoresArray"));

//sort the scores from highest to lowest
storedScoresArray.sort(function(a,b) {
    return b[1]-a[1]
    });
    
    console.log("storedScoresArray: " + storedScoresArray);

//create an array of the top three scores
let scoresToRender = storedScoresArray.slice(0,3);
    console.log("scoresToRender: " + scoresToRender);

//only display the top three scores
function renderHighscore() {
    highscoresList.innerHTML = "";
    for (let i = 0; i < scoresToRender.length; i++) {
        const li = document.createElement("li");
        li.textContent = scoresToRender[i][0] + " - " + scoresToRender[i][1];
        console.log(li.textContent);
        highscoresList.appendChild(li);
    }
}

renderHighscore();

//clear all scores when the 'Clear Highscores' button is clicked
clearButton.addEventListener("click", function(event) {
    localStorage.clear("scoresArray");
    highscoresList.innerHTML = "";
})





