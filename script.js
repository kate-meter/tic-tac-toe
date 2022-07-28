//close overlay & start game
var removeOverlay = document.getElementById("remove-overlay");

removeOverlay.addEventListener("click", closeOverlay)

function closeOverlay(){
  document.getElementById("settings-overlay").style.display = "none";
}

//player choice of X and O
var player = "";
var computer = "";

document.getElementById("player-choice-X").addEventListener("click", playerIsX);
document.getElementById("player-choice-O").addEventListener("click", playerIsO);

document.getElementById("goes-first-computer").addEventListener("click", computerFirst);

function playerIsX(){
  document.getElementById("player-choice-X").style.backgroundColor = "#A9A9A9";
  document.getElementById("player-choice-O").style.backgroundColor = "#F5F5F5";
  player = "X";
  computer = "O";
}

function playerIsO(){
  document.getElementById("player-choice-O").style.backgroundColor = "#A9A9A9";
  document.getElementById("player-choice-X").style.backgroundColor = "#F5F5F5";
  player = "O";
  computer = "X";
}

function computerFirst(){
  document.getElementById("goes-first-computer").style.backgroundColor = "#A9A9A9";
  document.getElementById("goes-first-player").style.backgroundColor = "#F5F5F5";
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board.length; j++){
      board[i][j].innerHTML = "";
    }
  }
  document.getElementById("winnerIs").innerHTML = "";
  computerTurn(computer);
}

//define board
var board = [
  [
    document.getElementById("(1,1)"), 
    document.getElementById("(2,1)"), 
    document.getElementById("(3,1)")
  ],
  [
    document.getElementById("(1,2)"), 
    document.getElementById("(2,2)"), 
    document.getElementById("(3,2)")
  ],
  [
    document.getElementById("(1,3)"), 
    document.getElementById("(2,3)"), 
    document.getElementById("(3,3)")
  ]
];

var winner = "";

//if player gets to go first
document.getElementById("goes-first-player").addEventListener('click', function onClick() {
  this.style.backgroundColor = "#A9A9A9";
  document.getElementById("goes-first-computer").style.backgroundColor = "#F5F5F5";
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board.length; j++){
      board[i][j].innerHTML = "";
    }
  }
  document.getElementById("winnerIs").innerHTML = "";
});

//person goes
for(var i = 0; i < board.length; i++){
  for(var j = 0; j < board.length; j++){
    board[i][j].addEventListener('click', function(){
      if(this.innerHTML == ""){
        this.innerHTML = player;
        checkBoardWinner();
        checkBoardDraw();
        if(winner == ""){
          computerTurn(computer);
          checkBoardWinner();
          checkBoardDraw();
        }
      }
    });
  }
}

//computer goes
function computerTurn(xOrO){
  var xValue = Math.floor(Math.random()*3);
  var yValue = Math.floor(Math.random()*3);
  if(board[xValue][yValue].innerHTML == ""){
    board[xValue][yValue].innerHTML = xOrO;
  }
  else{
    computerTurn(xOrO);
  }
}

//check board
function checkBoardWinner(){
  for(var i = 0; i < 3; i++){
    if(
      (
        board[i][0].innerHTML == "X" || 
        board[i][0].innerHTML == "O"
      ) && 
      (
        board[i][0].innerHTML == board[i][1].innerHTML && 
        board[i][1].innerHTML == board[i][2].innerHTML
      )
    ){
      winner = board[i][0].innerHTML;
      document.getElementById("winnerIs").innerHTML = "Winner is " + winner + "!";
    }
    else if(
      (
        board[0][i].innerHTML == "X" || 
        board[0][i].innerHTML == "O"
      ) && 
      (
        board[0][i].innerHTML == board[1][i].innerHTML && 
        board[1][i].innerHTML == board[2][i].innerHTML
      )
    ){
      winner = board[0][i].innerHTML;
      document.getElementById("winnerIs").innerHTML = "Winner is " + winner + "!";
    }
  }
  //diagonal
  if(
    (
      board[0][0].innerHTML == "X" || 
      board[0][0].innerHTML == "O"
    ) && 
    (
      board[0][0].innerHTML == board[1][1].innerHTML && 
      board[1][1].innerHTML == board[2][2].innerHTML
    )
  ){
    winner = board[0][0].innerHTML;
    document.getElementById("winnerIs").innerHTML = "Winner is " + winner + "!";
  }
  else if(
    (
      board[0][2].innerHTML == "X" || 
      board[0][2].innerHTML == "O"
    ) && 
    (
      board[0][2].innerHTML == board[1][1].innerHTML && 
      board[1][1].innerHTML == board[2][0].innerHTML
    )
  ){
    winner = board[2][0].innerHTML;
    document.getElementById("winnerIs").innerHTML = "Winner is " + winner + "!";
  }
}

//restart game
document.getElementById("restart-button").addEventListener("click", restartGame);

function restartGame(){
  document.getElementById("player-choice-X").style.backgroundColor = "#F5F5F5";
  document.getElementById("player-choice-O").style.backgroundColor = "#F5F5F5";
  document.getElementById("goes-first-computer").style.backgroundColor = "#F5F5F5";
  document.getElementById("goes-first-player").style.backgroundColor = "#F5F5F5";
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board.length; j++){
      board[i][j].innerHTML = "";
    }
  }
  document.getElementById("winnerIs").innerHTML = "";
  displayOverlay();
}

function displayOverlay(){
  document.getElementById("settings-overlay").style.display = "block";
}

function checkBoardDraw(){
    if(
      board[0][0].innerHTML != "" && 
      board[0][1].innerHTML != "" && 
      board[0][2].innerHTML != "" && 
      board[1][0].innerHTML != "" && 
      board[1][1].innerHTML != "" && 
      board[1][2].innerHTML != "" && 
      board[2][0].innerHTML != "" && 
      board[2][1].innerHTML != "" && 
      board[2][2].innerHTML != "" && 
      document.getElementById("winnerIs").innerHTML == ""
    ){
      document.getElementById("winnerIs").innerHTML = "Draw! Try again?";
    }
}