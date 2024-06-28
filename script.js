const cross = '<i class="fa-solid fa-xmark fa-beat" style="--fa-animation-duration: 0.5s; --fa-animation-iteration-count: 1;"></i>';
const circle = '<i class="fa-solid fa-o fa-beat" style="--fa-animation-duration: 0.5s; --fa-animation-iteration-count: 1;"></i>';
let count = 1;
let Player = 1;
let score_1 = 0;
let score_2 = 0;
let Start = "False";
let CheckMove = ["", "", "", "", "", "", "", "", ""];
let R_Count = 1;
var P1_Value;
var P2_Value;
let swap_count = 1;

function start() {
    if (Start === "False") {
        const msg = document.getElementById("msg");
        if (swap_count == R_Count) {
            P1_Value = document.getElementById("P1").value || "Player 1";
            P2_Value = document.getElementById("P2").value || "Player 2";
        }
        else {
            swap_count = R_Count;
            let temp = P1_Value;
            P1_Value = P2_Value;
            P2_Value = temp;
            document.getElementById("P1").value = P1_Value;
            document.getElementById("P2").value = P2_Value;
            temp = score_2;
            score_2 = score_1;
            score_1 = temp;
            document.getElementById("score-p1").innerHTML = score_1;
            document.getElementById("score-p2").innerHTML = score_2;
        }
        Start = "True";
        reset();
        updateContent();
        updateMessage(0);
    }
}

function updateMessage(Win) {

    if (Win === 0) {
        msg.innerHTML = (Player % 2 !== 0 ? P1_Value : P2_Value) + " to Move !!";
        Player++;
    } else if (Win === 1) {
        msg.innerHTML = "Game is Drawn !!";
        playAgain();
        Player = 1;
    } else {
        msg.innerHTML = (Player % 2 !== 0 ? P2_Value : P1_Value) + " Wins !!";
        updateScore(Player % 2 === 0 ? 1 : 2);
        Player = 1;
        updateWin(Win);
        playAgain();
    }
}

function updateContent() {
    const boardBoxes = document.querySelectorAll(".board-box");
    boardBoxes.forEach((box) => box.classList.add("box-hover"));

    const roundClickDiv = document.querySelector(".round");
    const h2 = roundClickDiv.querySelector("h2");
    const h3 = roundClickDiv.querySelector("h3");
    const p = roundClickDiv.querySelector("p");
    roundClickDiv.classList.remove("round-click");
    h2.textContent = "";
    h3.textContent = R_Count;
    p.textContent = "Round";

    document.getElementById("P1").readOnly = true;
    document.getElementById("P2").readOnly = true;

    document.querySelectorAll(".fa-pen").forEach(icon => icon.style.display = "none");
}

function updateScore(winner) {
    if (winner === 1) score_1++;
    else score_2++;
    document.getElementById("score-p1").innerHTML = score_1;
    document.getElementById("score-p2").innerHTML = score_2;
}

function play(move) {
    if (Start === "True" && CheckMove[move - 1] === "") {
        document.getElementById("b" + move).innerHTML = (count % 2 === 0) ? circle : cross;
        CheckMove[move - 1] = (count % 2 === 0) ? "O" : "X";
        count++;
        let Win = checkWin();
        if (Win !== 0) {
            Start = "False";
            count = 1;
        }
        if (count === 10) {
            Start = "False";
            Win = 1;
            count = 1;
        }
        updateMessage(Win);
    }
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

function checkWin() {
    for (const [a, b, c] of winningCombinations) {
        if (CheckMove[a] && CheckMove[a] === CheckMove[b] && CheckMove[a] === CheckMove[c]) {
            return (a + 1) * 100 + (b + 1) * 10 + (c + 1);
        }
    }
    return 0;
}

function updateWin(Win) {
    var b1 = Win % 10;
    Win = Win / 10;
    var b2 = Math.floor(Win) % 10;
    var b3 = Win / 10;
    b3 = Math.floor(b3);
    console.log(b1 + b2 + b3);
    document.getElementById("b" + b1).classList.add("box-win");
    document.getElementById("b" + b2).classList.add("box-win");
    document.getElementById("b" + b3).classList.add("box-win");
}

function playAgain() {
    const roundClickDiv = document.querySelector(".round");
    const h2 = roundClickDiv.querySelector("h2");
    const h3 = roundClickDiv.querySelector("h3");
    const p = roundClickDiv.querySelector("p");
    roundClickDiv.classList.add("round-click");
    h2.textContent = "Play Again";
    h3.textContent = "";
    p.textContent = "";
    Start = "False";
    document.querySelectorAll(".board-box").forEach((box) => box.classList.remove("box-hover"));
    R_Count++;
}

function reset() {
    document.querySelectorAll(".board-box").forEach((box) => {
        box.innerHTML = "";
        box.classList.remove("box-win");
    });
    CheckMove = ["", "", "", "", "", "", "", "", ""];
}

function restart() {
    const roundClickDiv = document.querySelector(".round");
    const h2 = roundClickDiv.querySelector("h2");
    const h3 = roundClickDiv.querySelector("h3");
    const p = roundClickDiv.querySelector("p");
    roundClickDiv.classList.add("round-click");
    h2.textContent = "Start";
    h3.textContent = "";
    p.textContent = "";
    Start = "False";
    document.querySelectorAll(".board-box").forEach((box) => box.classList.remove("box-hover"));
    reset();
    count = 1;
    Player = 1;
    score_1 = 0;
    score_2 = 0;
    R_Count = 1;
    document.getElementById("P1").readOnly = false;
    document.getElementById("P2").readOnly = false;
    document.getElementById("P1").value = '';
    document.getElementById("P2").value = '';
    document.querySelectorAll(".fa-pen").forEach(icon => icon.style.display = "block");
    document.getElementById("score-p1").innerHTML = score_1;
    document.getElementById("score-p2").innerHTML = score_2;
    document.getElementById("msg").innerHTML = ("Press Start to Play the Game !");
}