const deckOfCards = document.getElementById('deck');
let flippedCards = [];
let moves = 0;
let timerOff = true;
let time = 0;
let timerId;
let pairs = 0;
const totalPairs = 8;

function shuffleDeckOfCards(){
  const cardsToShuffle =  Array.from(document.querySelectorAll('#deck li'));
  // console.log('Cards to Shuffle:',cardsToShuffle);
  const shuffledCards = shuffle(cardsToShuffle);
  // console.log('Shuffled Cards:',shuffledCards);
  for(card of shuffledCards){
    deckOfCards.appendChild(card);
  }
}
shuffleDeckOfCards();

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

deckOfCards.addEventListener('click', event =>{
    const tappedCard = event.target;

    if(checkClick(tappedCard)
    ){
      if (timerOff){
        startTimer();
        timerOff = false;
      }

        tapCard(tappedCard);
        addFlippedCard(tappedCard);
      if(flippedCards.length === 2){
        checkForPair(tappedCard);
        addAttemptedPair();
        checkScore();
        displayTimer();
      }
    }
});

function checkClick(tappedCard){
  return (
    tappedCard.classList.contains('card') &&
    !tappedCard.classList.contains('match') &&
    flippedCards.length < 2 &&
    !flippedCards.includes(tappedCard)
  );
}


function tapCard(tappedCard){
  tappedCard.classList.toggle('open');
  tappedCard.classList.toggle('show');
}

function addFlippedCard(tappedCard){
  flippedCards.push(tappedCard);
}

function checkForPair(){
  if(
      flippedCards[0].firstElementChild.className ===
      flippedCards[1].firstElementChild.className
    ){
      flippedCards[0].classList.toggle('match');
      flippedCards[1].classList.toggle('match');
      pairs++;
      flippedCards = [];
      if(pairs==totalPairs){gameWon();}
  } else {
      setTimeout( () => {
      tapCard(flippedCards[0]);
      tapCard(flippedCards[1]);
      flippedCards = [];
    }, 1000);
  }
}

function addAttemptedPair(){
  moves++;
  const movesDisplay = document.getElementById('moves');
  movesDisplay.innerHTML = moves;
}

function checkScore(){
  if (moves === 8 || moves === 16){
    loseStar();
  }
}

function loseStar(){
  const stars = document.querySelectorAll('.stars li');
  for (star of stars){
    if(star.style.display !== 'none'){
      star.style.display ='none';
      break;
    }
  }
}
function startTimer(){
  timerId = setInterval(() => {
    time++;
    displayTimer();
  }, 1000);
}
function displayTimer(){
  const gameTime = document.getElementById('timer');
  const minutes = Math.floor(time/60);
  const seconds = time % 60;
  if (seconds < 10){
    gameTime.innerHTML=`${minutes}:0${seconds}`;
  }else
  gameTime.innerHTML=`${minutes}:${seconds}`;
}

function stopTimer(){
  clearInterval(timerId);
}

///modal

function gameWon(){
  stopTimer();
  modal();
  finalStats();
}

function modal(){
  const modal = document.querySelector('.modal');
      modal.classList.toggle('duringGame');

}

function finalStats(){
  let modalStats = document.querySelector('.modal-stat');
  let starCount = document.querySelector('.stars').childElementCount;

  modalStats.innerHTML = "You won the game with " + moves +
    " moves and " +starCount+ " stars. Great job!";
}

document.querySelector('.close-modal').addEventListener('click', () =>{
  modal();
})

document.querySelector('.resetGame').addEventListener('click', () =>{
  playAgain();
  toggleAllCards();
  modal();
  })

document.querySelector('.newGame').addEventListener('click', () =>{playAgain(); toggleAllCards();
})


//RESETTING THE GAME

function playAgain(){
  newTime();
  newMoves();
  newStars();
  shuffleDeckOfCards();
  pairs = 0;
}

function newTime(){
  timerOff = true;
  time = 0;
  stopTimer();
  displayTimer();
}

function newMoves(){
  moves = 0;
  const movesDisplay = document.getElementById('moves');
  movesDisplay.innerHTML = moves;
}

function newStars(){
  const stars = document.querySelectorAll('.stars li');
  for (star of stars){
    if(star.style.display == 'none'){
      star.style.display ='inline-block';
      // break;
    }
  }
}

function toggleAllCards(){
  const cards = document.querySelectorAll('#deck li');
    for(let card of cards){
      card.className='card';
    }
    flippedCards = [];
  }

//   Resources Used

// Starter Code from Udacity Front-End Nanodegree-https://github.com/udacity/fend-project-memory-game)
// Originally Wrote Code in Code Pen](https://codepen.io/lindsayanunez/pen/rZGLzw?editors=1010)
// Matthew Cranford's Tutorial Part 1-https://matthewcranford.com/memory-game-walkthrough-part-1-setup/
// Matthew Cranford's Tutorial Part 2-https://matthewcranford.com/memory-game-walkthrough-part-2-toggling-cards/
// Matthew Cranford's Tutorial Part 3-https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/
// Matthew Cranford's Tutorial Part 4-https://matthewcranford.com/memory-game-walkthrough-part-4-shuffling-decks/
// Matthew Cranford's Tutorial Part 5-https://matthewcranford.com/memory-game-walkthrough-part-5-moves-stars/
// Matthew Cranford's Tutorial Part 6-https://matthewcranford.com/memory-game-walkthrough-part-6-the-clock/
// Matthew Cranford's Tutorial Part 7-https://matthewcranford.com/memory-game-walkthrough-part-7-making-a-modal/
