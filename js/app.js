

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    return cards;
}


const cards = document.querySelectorAll(".card");
const restartButton = document.querySelector(".restart");

let firstCard,secondCard;
let blocker = false;
let flippedCard = false;
let matchCounter = 0;
let notMatchCounter = 0;
let totalCounter = 0;
let stars =0;
let playAgain;

restartButton.addEventListener("click" , restartgame);    
cards.forEach(card => card.addEventListener("click" , flipCard));
shuffle(cards);
function flipCard(){
    //blocking another card to be flipped
    if(blocker) return;
    //checking if the card is double clicked
    if(this === firstCard) return;
    //Add classes to the clicked card
    this.classList.add("open","show");
    if(!flippedCard){
         //first card 
         flippedCard = true;
         firstCard = this;
         
         

         return;
     }
        //second card
        flippedCard = false;
        secondCard = this;
        
    //matching cards    
    matching();  

 }
function matching(){
    if(firstCard.dataset.name === secondCard.dataset.name){
         doMactch();
    }else{
         doNotMatch();
    }
    //counting total moves   
    totalCounter = matchCounter + notMatchCounter;
    document.querySelector(".moves").innerHTML = totalCounter;
    console.log(totalCounter);
    rating();
    
    endGame();

}
function doMactch(){
    blocker = true;
    setTimeout(() => {
        firstCard.classList.add("match");
        secondCard.classList.add("match");
        firstCard.removeEventListener("click",flipCard);
        secondCard.removeEventListener("click",flipCard);
        resetCards();

    },500);
    //counting matched cards
    matchCounter ++;
}
function doNotMatch(){
    blocker = true;
    //add classes
    setTimeout(() => {
        firstCard.classList.add("notMatch","shake");
        secondCard.classList.add("notMatch","shake");
    },500);

    setTimeout(() => {
        firstCard.classList.remove("show" , "open" , "notMatch","shake");
        secondCard.classList.remove("show" , "open" , "notMatch","shake");
        resetCards()
    },2000);
    //counting unmatched cards
    notMatchCounter ++;

}
function resetCards(){
    [flippedCard,blocker] = [false,false];
    [firstCard,secondCard] = [null,null];
}
function endGame(){
    rating();
    if(matchCounter == 8){
        document.querySelector(".container").innerHTML = "<div><h3>Congratulation! You Won!</h3>"+"<p>With "+totalCounter+" Moves and "+stars+" Star(s)</p><button id='playAgain'><strong>Play Again<strong></button></div>";
        playAgain = document.querySelector("#playAgain");
        playAgain.addEventListener("click" , function(){
            document.querySelector(".container").innerHTML = document.querySelector("body");  
        })
    }
}
function restartgame(){
    //adding eventListeners to the cards which were matching
    cards.forEach(card => card.addEventListener("click" , flipCard));

    //removing classes from each element from cards array
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("show","open","match","shake");
      }
    resetCards();
    resetCounters();
}
function resetCounters(){

    [matchCounter,notMatchCounter,totalCounter,stars] =[0,0,0,0];
    document.querySelector(".moves").innerHTML = totalCounter;

}
function rating(){

    let ratingStars;


    if (totalCounter <= 8){
       stars = 3;
    }else if (totalCounter <= 10){
        stars = 2;
        ratingStars = document.querySelector("#star3");
        ratingStars.classList.remove("fa-star");
        ratingStars.classList.add("fa-star-o");

    }else{
        stars = 1; 
        ratingStars = document.querySelector("#star2");
        ratingStars.classList.remove("fa-star");
        ratingStars.classList.add("fa-star-o");

    }
}