const cross =
    '<i class="fa-solid fa-xmark fa-beat" style="--fa-animation-duration: 0.5s; --fa-animation-iteration-count: 1;"></i>';
const circle =
    '<i class="fa-solid fa-o fa-beat" style="--fa-animation-duration: 0.5s; --fa-animation-iteration-count: 1;"></i>';
let Move_Count;
let Player_Count;
let Score_1;
let Score_2;
let Start;
let R_Count;
var P1_Name;
var P2_Name;
let Swap;
let CheckMove_3 = ["", "", "", "", "", "", "", "", ""];
let CheckMove_4 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let Grids;

let msg = document.getElementById("msg");
let roundClickDiv = document.querySelector(".round");
let h2 = roundClickDiv.querySelector("h2");
let h3 = roundClickDiv.querySelector("h3");
let p = roundClickDiv.querySelector("p");

function mode(choice) {
    Grids = choice;
    document.getElementById("start_box").style.top = "-100vh";
    document.getElementById("game_box").style.top = "0";
    board();
    P1_Name = document.getElementById("P1_Name").value || "Player 1";
    P2_Name = document.getElementById("P2_Name").value || "Player 2";
    updateName();
    initialValue();
    updateScore();
}

function board() {
    let board_box = document.getElementById("board");
    board_box.innerHTML = "";

    if (Grids == 3) {
        board_box.classList.add("board3");
        for (let i = 1; i <= 9; i++) {
            board_box.innerHTML +=
                '<div class="board-box" id="b3' +
                i +
                '" onclick="play(' +
                i +
                ')"></div>';
        }
    } else if (Grids == 4) {
        board_box.classList.add("board4");
        for (let i = 1; i <= 16; i++) {
            board_box.innerHTML +=
                '<div class="board-box board-box2" id="b4' +
                i +
                '" onclick="play(' +
                i +
                ')"></div>';
        }
    }
}

function updateName() {
    document.getElementById("P1_name").innerHTML = P1_Name;
    document.getElementById("P2_name").innerHTML = P2_Name;
}

function updateScore() {
    document.getElementById("score-p1").innerHTML = Score_1;
    document.getElementById("score-p2").innerHTML = Score_2;
}

function initialValue() {
    Move_Count = 1;
    Player_Count = 1;
    Score_1 = 0;
    Score_2 = 0;
    Start = "False";
    R_Count = 1;
    Swap = 1;
    CheckMove_3 = ["", "", "", "", "", "", "", "", ""];
    CheckMove_4 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    msg.innerHTML = "Press Start to Play the Game !";
    roundClickDiv.classList.add("round-click");
    h2.textContent = "Start";
    h3.textContent = "";
    p.textContent = "";
}

function start() {
    if (R_Count > 1) {
        document.querySelectorAll(".board-box").forEach((box) => {
            box.innerHTML = "";
            box.classList.remove('box-win');
        });
        CheckMove_3 = ["", "", "", "", "", "", "", "", ""];
        CheckMove_4 = ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", "",];
        Player_Count = 1;
        Move_Count = 1;
        let temp = P1_Name;
        P1_Name = P2_Name;
        P2_Name = temp;
        updateName();
    }
    Start = "True";
    unlockBoard();
    updateRound();
    updateMessage();
}

function unlockBoard() {
    const boardBoxes = document.querySelectorAll(".board-box");
    boardBoxes.forEach((box) => box.classList.add("box-hover"));
}

function lockBoard() {
    Start = "False";
    const boardBoxes = document.querySelectorAll(".board-box");
    boardBoxes.forEach((box) => box.classList.remove("box-hover"));
}

function updateRound() {
    roundClickDiv.classList.remove("round-click");
    h2.textContent = "";
    h3.textContent = R_Count;
    p.textContent = "Round";
}

function updateMessage() {
    msg.innerHTML = (Player_Count % 2 !== 0 ? P1_Name : P2_Name) + " to Move !!";
    Player_Count++;
}

function play(move) {
    if (Start === "True" && Grids == 3) {
        let Move_box = document.getElementById("b3" + move);
        if (CheckMove_3[move - 1] === "") {
            Move_box.innerHTML = Move_Count % 2 === 0 ? circle : cross;
            CheckMove_3[move - 1] = Move_Count % 2 === 0 ? "O" : "X";
            Move_Count++;
            updateMessage();
            checkWin();
        }
    } else if (Start === "True" && Grids == 4) {
        let Move_box = document.getElementById("b4" + move);
        if (CheckMove_4[move - 1] === "") {
            Move_box.innerHTML = Move_Count % 2 === 0 ? circle : cross;
            CheckMove_4[move - 1] = Move_Count % 2 === 0 ? "O" : "X";
            Move_Count++;
            updateMessage();
            checkWin();
        }
    }
    if(Grids == 3 && Move_Count == 10){
        onDraw();
    }
    if(Grids == 4 && Move_Count == 17){
        onDraw();
    }
}

function onDraw(){
    Start = 'False'
    lockBoard();
    msg.innerHTML = 'Match Drawn !!';
    playAgain();
}

const winningCombinations_3 = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

const winningCombinations_4 = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
];

function checkWin() {
    if (Grids == 3) {
        for (const [a, b, c] of winningCombinations_3) {
            if (
                CheckMove_3[a] &&
                CheckMove_3[a] === CheckMove_3[b] &&
                CheckMove_3[a] === CheckMove_3[c]
            ) {
                updateWin(a + 1, b + 1, c + 1);
                // console.log('Win' + a + b + c);
            }
        }
    } else if (Grids == 4) {
        for (const [a, b, c, d] of winningCombinations_4) {
            if (
                CheckMove_4[a] &&
                CheckMove_4[a] === CheckMove_4[b] &&
                CheckMove_4[a] === CheckMove_4[c] &&
                CheckMove_4[a] === CheckMove_4[d]
            ) {
                updateWin(a + 1, b + 1, c + 1, d + 1);
            }
        }
    }
}

function updateWin(a, b, c, d) {
    if (Grids == 3) {
        document.getElementById("b3" + a).classList.add("box-win");
        document.getElementById("b3" + b).classList.add("box-win");
        document.getElementById("b3" + c).classList.add("box-win");
    } else if (Grids == 4) {
        document.getElementById("b4" + a).classList.add("box-win");
        document.getElementById("b4" + b).classList.add("box-win");
        document.getElementById("b4" + c).classList.add("box-win");
        document.getElementById("b4" + d).classList.add("box-win");
    }
    lockBoard();
    afterWin();
}

function afterWin() {
    let Winner;
    if (Player_Count % 2 != 0) {
        Winner = P1_Name;
        Score_1++;
    } else {
        Winner = P2_Name;
        Score_2++;
    }
    msg.innerHTML = Winner + " Wins !!!";
    updateScore();
    playAgain();
}

function playAgain() {
    roundClickDiv.classList.add("round-click");
    h2.textContent = "Play Again";
    h3.textContent = "";
    p.textContent = "";
    R_Count++;
}

function goBack(){
    initialValue();
    document.getElementById("start_box").style.top = "0";
    document.getElementById("game_box").style.top = "100vh";
}
