const input = require('readline-sync');

//prompt to play again
function playAgainPrompt(){
  let response = input.question('Would you like to play again? (y/n)\t');
  console.log(response);
  if(response === 'y'){
    playGame();
  } else if(response === 'n'){
    console.log('Thanks for playing!');
    process.exit();
  } else {
    console.log('Invalid response, try again.');
    playAgainPrompt();
  }
};

function pickMove(table, currTurn){
  //prompt row and collumn
  let row = Number(input.question('Row?:\t')) -1;
  let collumn = Number(input.question('Collumn?:\t')) -1;
  //checks to see if you are X or O
  let currPlayer = currTurn === 1 ? 'X' : 'O';
  //initialize no winner
  let winner = false;
  //initialize booleans
  let horizontalMatch = true;
  let verticalMatch = true;
  let diagnol1Match = true;
  let diagnol2Match = true;
  //check to see if input is valid
  if(!table[row] || typeof table[row][collumn] === 'undefined' || table[row][collumn] !== ' '){
    console.log('Invalid Move, try again.');
    //recursively called again if false;
    return pickMove(table, currTurn);
  }
  //add move to table
  table[row][collumn] = currPlayer;

  //check solution
  for(let i = 0; i < 3; i++){
    //check horizontally
    if(table[row][i] !== currPlayer) horizontalMatch = false;
    //check vertically
    if(table[i][collumn] !== currPlayer) verticalMatch = false;
    //check diagnol 1
    if(table[i][i] !==currPlayer) diagnol1Match = false;
    //check diagnol 2
    if(table[i][2-i] !==currPlayer) diagnol2Match = false;
  }
  //set winner if any are still true
  if(horizontalMatch || verticalMatch || diagnol1Match || diagnol2Match) winner = currTurn;

  return {table, winner};
};

function printTable(table){
  console.log('  1 2 3');
  table.forEach((val, index) => {
    console.log(index + 1  + ' ' + val[0] + '|' + val[1] + '|' + val[2]);
    console.log('  ----- ');
  });
}

function playGame(){
  //set empty table
  let table = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
  //set player 1 to go first
  let currTurn = 1;
  let winner = false;
  let countTotalMoves = 0;

  //iterate until winner is determined
  while(!winner && countTotalMoves < 9){
    console.log('Player ' + currTurn + ' enter your move:');
    let result = pickMove(table, currTurn);
    //update table and winners
    table = result.table;
    winner = result.winner;
    printTable(table);
    //swap turns
    currTurn = currTurn === 1 ? 2 : 1;
    //increment this so the game ends after 9 legal moves are made
    countTotalMoves++;
  }
  if(winner){
    console.log('Player ' + winner + ' has won!!!');
  } else{
    console.log(`It's a tie!`);
  }
  playAgainPrompt();
}

exports.main = {
  playGame,
  printTable,
  pickMove,
  playAgainPrompt
}