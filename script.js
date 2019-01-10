
//BlackJack by TSykes
//first create array for suits and values

let suits = [ "♥︎", "♣︎", "♦︎", "♠︎"];
let values = ["Ace", "King", "Queen", "Jack", "Ten",
    "Nine", "Eight", "Seven", "Six", "Five", "Four",
    "Three", "Two"];
//
let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");
//game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

    document.getElementById('text-area').textContent=" Welcome to BlackJack!"
    document.getElementById('score-0').textContent = '';
    document.getElementById('score-1').textContent = '';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = "YOUR HAND";
    document.getElementById('name-1').textContent = "DEALER";



    newGameButton.style.display = "inline"
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
showStatus();

//add game start event and change variables on click
document.getElementById('new-game-button').addEventListener('click', function(){

  gameStarted = true;
  gameOver = false;
  playerWon = false;

  newGameButton.style.display = 'none';
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  document.querySelector('#name-0').textContent = "YOUR HAND";
  document.querySelector('#name-1').textContent = "DEALER";





  deck = createDeck();

  shuffleDeck(deck);
  playerCards = [getNextCard(), getNextCard()];
  dealerCards = [getNextCard(), getNextCard()];
  checkForEndOfGame();
  showStatus();

  showStatus();


});

hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame()
  showStatus();
});

function createDeck(){
  let deck=[];
  for(let suitIdx = 0; suitIdx < suits.length; suitIdx++){
    for(let valueIdx = 0; valueIdx<values.length; valueIdx++){
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);

    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (i=0; i<deck.length; i++){
    let swapIdx = Math.trunc(Math.random() * deck.length)
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card){
  return card.value + ' of ' + card.suit;
}
function getNextCard(){
  return deck.shift();
}

function getCardNumericValue(card) {
  switch(card.value) {
    case "Ace":
      return 1;
    case "Two":
      return 2;
    case "Three":
      return 3;
    case "Four":
      return 4;
    case "Five":
      return 5;
    case "Six":
      return 6;
    case "Seven":
      return 7;
    case "Eight":
      return 8;
    case "Nine":
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === "Ace"){
      hasAce = true;
    }
  }

  if (hasAce && score +10 <= 21){
    return score + 10;
    }
  return score;
}

function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}


function checkForEndOfGame(){
  updateScores();

  if (gameOver){
    while(dealerScore <playerScore
      && playerScore <= 21
      && dealerScore <= 21){
    dealerCards.push(getNextCard());
    updateScores();
    }
  }

  if(playerScore >21) {
    playerWon = false;
    gameOver = true;
  } else if (dealerScore >21){
      playerWon = true;
      gameOver = true;
  } else if(playerScore === 21){
      playerWon = true;
      gameOver = true;
  } else if(dealerScore === 21){
      playerWon = false;
      gameOver = true;
  } else if(gameOver){
      if(playerScore > dealerScore) {
        playerWon = true;
      } else {
        playerWon = false;
      }
  }
}
function showStatus(){
  if (!gameStarted) {
    textArea.innerText="Welcome to BlackJack!";
    return;
  }

  let dealerCardString = "";
  for (let i=0; i<dealerCards.length; i++){
    dealerCardString += getCardString(dealerCards[i]) + '\n';
    console.log(dealerCards)
  }
  let playerCardString = "";
  for (let i=0; i<playerCards.length; i++){
    playerCardString += getCardString(playerCards[i]) + '\n';
  }

  updateScores();

  document.getElementById('score-0').textContent = playerCardString;
  document.getElementById('score-1').textContent = dealerCardString;
  document.getElementById('current-0').textContent = playerScore;
  document.getElementById('current-1').textContent = dealerScore;


  if(gameOver){
    if(playerWon){
        document.querySelector('#name-0').textContent = "YOU WIN!";
    } else if(playerScore === dealerScore){
        document.querySelector('#name-0').textContent = "PUSH"
    }
    else {
        document.querySelector('#name-1').textContent = "DEALER WINS";
    }
      newGameButton.style.display = "inline";
      hitButton.style.display = "none";
      stayButton.style.display = "none";
  }
}
