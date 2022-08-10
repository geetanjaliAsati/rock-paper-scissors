// dom variables
const pScore = document.getElementById("playerScore")
const cScore = document.getElementById("computerScore")

const playerSelect = document.getElementById("playerSelect")
const computerSelect = document.getElementById("computerSelect")

const message = document.getElementById("message")
const submit = document.getElementById("submit")

const rock = document.getElementById("rock")
const paper = document.getElementById("paper")
const scissors = document.getElementById("scissors")

// custom variables
let playerScore = 0;
let computerScore = 0;

let gameActive = false;

const mapCodeToWinner = {
    0 : "Draw!",
    1: "Player won!",
    2: "Computer won"
}

// main functions

const displayBoards = () => {

    const start = document.getElementById("start");
    const boards = document.getElementById("boards")
    const select = document.getElementById("select")

    start.style.display = "none";

    boards.style.display = "block";
    select.style.display = "block";

    gameActive = true;

}

const computerPlay = () => {
    let options = ["rock", "paper", "scissors"];

    let randomChoice = options[Math.floor(Math.random()*options.length)];

    return randomChoice;
}

const playRound = (ps, cs) => {

    // return 0 if it's a draw
    // return 1 if player won
    //  return -1 if computer won
    if(ps===cs){
        return 0;
    }else if(ps === "rock" && cs === "scissors"){
        return 1;
    }else if(ps === "rock" && cs === "paper"){
        return 2;
    }else if(cs === "rock" && ps === "scissors"){
        return 2;
    }else if(cs === "rock" && ps === "paper"){
        return 1;
    }else if(ps === "scissors" && cs === "paper"){
        return 1;
    }else if(ps === "paper" && cs === "scissors"){
        return 2;
    }

    // if(ps===cs){
    //     return 0;
    // }else if(ps==="rock"){
    //     return (cs==="scissors" ? 1 : -1)
    // }else if()

}

const getMeWinner = playerSelection => {
    const computerSelection = computerPlay();

    let winner = playRound(playerSelection,computerSelection);

    // winner = mapCodeToWinner[winner];

    return ({
        winner: winner,
        compMove: computerSelection
    })
}

const displaySelection = (whoIsPlaying, selection, result) => {
    if(whoIsPlaying === "player"){
        playerSelect.innerHTML = `<i class="fas fa-hand-${selection}"></i>`

        if(result=== 1){
            playerSelect.style.color = "green";
            computerSelect.style.color = "red"
        }
    }else{
        computerSelect.innerHTML = `<i class="fas fa-hand-${selection}"></i>`
        if(result=== 2){
            playerSelect.style.color = "red";
            computerSelect.style.color = "green"
        }
    }

    if(result===0){
        computerSelect.style.color = ""
        playerSelect.style.color = ""
    }
}

const scoreBoard = result => {
    if(result === 1){
        playerScore++;

    }else if(result === 2){
        computerScore++;

    }
    pScore.innerText = playerScore;
    cScore.innerText = computerScore;
}


const gameFinished = () => {
    if(playerScore===5 || computerScore===5){
        return true;
    }
    return false;
}

const reset = () => {
    setTimeout(()=>{
        playerScore=0;
        computerScore=0;
        computerSelect.innerHTML=""
        playerSelect.innerHTML=""
        pScore.innerText = 0;
        cScore.innerText = 0;
        gameActive = false;
        message.innerText = "Choose rock, paper or scissors to play again!"
    }, 3000)
}
const whoWon = () => {
    if(gameFinished()){
        if(playerScore===5){
            message.innerText = "Player is the winner! Congratulations!"
        }else{
            message.innerText = "Computer is the winner! Shame on you!"
        }
        reset()
    }
}
const gameFlow = (playerSelection) => {
    const winnerObject = getMeWinner(playerSelection);

    const results = winnerObject.winner;

    const computerMove = winnerObject.compMove;

    displaySelection('player', playerSelection, results);
    displaySelection('computer', computerMove, results);

    scoreBoard(results)

    
    message.innerText = mapCodeToWinner[results];

    whoWon()
}


// event listeners
submit.addEventListener("click", displayBoards)

rock.addEventListener("click",()=> gameFlow(rock.id))
paper.addEventListener("click",()=> gameFlow(paper.id))
scissors.addEventListener("click",()=> gameFlow(scissors.id))
