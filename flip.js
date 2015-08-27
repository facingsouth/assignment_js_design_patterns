// Model
// Keeps Track of cards
// Ignore score for now

// 2x2 Board
var BOARDSIZE = 8;

// Internal representation of a given card
function Card(val){
  this.val = val;
  this.flipped = false;

  // Cards can toggle their flipped state.
  this.flip = function(){
    if (this.flipped){
      this.flipped = false;
    } else {
      this.flipped = true;
    }
  }
}

// Keeps track of the game's internal state.
var model = {

  init: function(){
    model.cards = [];
    model.previousCard = null;
    model.currentCard = null;

    for(var i = 0; i < BOARDSIZE; i++){
      model.cards.push(new Card(i));
      model.cards.push(new Card(i));
    };

    model.cards.sort(function () {
     return [1, -1, 0][Math.random() *3 |0];
    });
  },

  flipCard: function(index){
    // Get the correct card and flip it.
    console.log(index);
    model.previousCard = model.currentCard;

    model.currentCard = this.cards[parseInt(index)];
    model.currentCard.flip();

    // Check to see if flipped cards match if applicable
    // checkIfCardsMatch(model.currentCard);
  },

  checkIfCardsMatch: function(card){
    if (model.currentCard.val === model.previousCard.val) {
      var result = [model.currentCard, model.previousCard];
      model.currentCard = model.previousCard = null;
      return result;
    } else {
      return false;
    }
  },

  unflipCards: function(){
    model.currentCard.flip();
    model.previousCard.flip();
    model.currentCard = model.previousCard = null;
  }
}

var controller = {
  flipCount: 0,

  init: function(){
    model.init();
    this.initializeBoard();
    view.init();
  },

  play: function(target){
    model.flipCard(parseInt(target.id));
    this.flipCount++;
    if (this.flipCount % 2 === 0) {
      if (model.checkIfCardsMatch()) {
        view.setMatchingCards();
      } else {
        view.unflipCards();
        model.unflipCards();
      }

    }
  },

  initializeBoard: function(){
    var board = $("#board");
    // Actually append divs to board.
    for (var i = 0; i < model.cards.length; i++){
      board.append("<div id='" + i + "' class='card unflipped'>" + model.cards[i].val + "</div>")
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
    $('#board').on('click', '.unflipped', function(e) {view.flipCard(e)});
  },

  flipCard: function(e) {
    $(e.target).toggleClass('unflipped');
    $(e.target).toggleClass('flipped');
    controller.play(e.target);
  },

  unflipCards: function() {
    var $cards = $('.flipped');
    $cards.removeClass("flipped")
    setTimeout(function() {
      $cards.toggleClass('unflipped');
    }, 1000)

  },

  setMatchingCards: function() {
    // for (var i=0; i<model.cards.length; i++) {
    //   var $card = $('#' + model.cards[i].id);
    //   $card.removeClass("flipped unflipped");
    //   $card.addClass("matched");
    // }
    var $cards = $('.flipped')
    $cards.removeClass("flipped unflipped");
    $cards.addClass("matched");
  },
}

$(document).ready(function(){
    controller.init();
});



