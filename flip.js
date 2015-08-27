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
    var currentCard = null;

    for(var i = 0; i < BOARDSIZE; i++){
      cards.push(card(value));
    }
  }

  flipCard: function(index){
    // Get the correct card and flip it.
    currentCard = cards[i];
    currentCard[i].flip();

    // Check to see if flipped cards match if applicable
    // checkIfCardsMatch(currentCard);
  }

  checkIfCardsMatch: function(card){
    if (currentCard.value === previousCard.value) {
      var result = [currentCard, previousCard];
      currentCard = previousCard = null;
      return result;
    } else {
      return false;
    }

  }
}

var controller = {
  flipCount: 0,
  play: function(target){
    model.flipCard(parseInt(target.id));
    flipCount++;
    if (flipCount % 2 === 0) {
      var matching = model.checkIfCardsMatch();
      if (matching) {
        view.setMatchingCards(matching);
      } else {
        view.unflipCards();
        model.unflipCards();
      }

    }
  }
}

// View
// Displays Cards at the start
// Has functions to flip cards

// Controller
// Issues commands to model
// Tells the view to flip cards based on the Model's response

var view = {

  init: function() {
    $('#board').on('click', '.unflipped', function(e) {flipCard(e)});
  },

  flipCard: function(e) {
    $(e.target).toggleClass('.unflipped');
    $(e.target).toggleClass('.flipped');
    controller.play(e.target);
  },

  unflipCards: function() {
    $('.flipped').toggleClass('flipped');
    $('.flipped').toggleClass('unflipped');
  },

  setMatchingCards: function(cards) {
    for (var i=0; i<cards.length; i++) {
      $('#' + cards[i].id).removeClass("flipped unflipped").addClass("matched");
    }
  }


}
















