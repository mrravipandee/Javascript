let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genComputerChoice = () => {
    const choice = ["rock", "paper", "scissors"];
    const randIndex = Math.floor(Math.random() * 3);
    return choice[randIndex];
}

const drawGame = () => {
    msg.innerText = "Game was draw."
    msg.style.backgroundColor = "#FFF";
}

const showWinner = (userWin) => {
    if(userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = "You win!";
        msg.style.backgroundColor = "#b2e7d2";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = "You Lose!";
        msg.style.backgroundColor = "#f083a2";
    }
}

const playGame = (userChoice) => {
    // generate computer choice
    const compChoice = genComputerChoice();

    if(userChoice === compChoice) {
        // draw game
        drawGame();
    } else {

        let userWin = true;

        if(userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if(userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }

        showWinner(userWin);
    }

};

choices.forEach( (choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});