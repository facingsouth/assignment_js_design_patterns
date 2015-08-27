// Model
// Keeps Track of cards
// Ignore score for now

// 2x2 Board
var BOARDSIZE = 2;

// Internal representation of a given card
var card = function(value){
  value: value,
  flipped: false,

  // Cards can toggle their flipped state.
  flip: function(){
    if (flipped){
      flipped = false;
    } else {
      flipped = true;
    }
  }
}

// Keeps track of the game's internal state.
var model = {

  init: function(){
    var cards = [];
    var previousCard = null;

    for(var i = 0; i < BOARDSIZE; i++){
      cards.push(card(value));
    }
  }

  flipCard: function(index){
    // Get the correct card and flip it.
    currentCard = cards[i];
    currentCard[i].flip();

    // Check to see if flipped cards match if applicable
    checkIfCardsMatch(currentCard);
  }

  checkIfCardsMatch: function(card){
    if (card.value === previousCard.value)

  }
}

var controller = {
  play: function(){
    view.flipCard();
    model.flipCard();
  }
}

// View
// Displays Cards at the start
// Has functions to flip cards

// Controller
// Issues commands to model
// Tells the view to flip cards based on the Model's response
