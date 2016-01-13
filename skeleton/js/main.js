var HanoiView = require('./hanoi-view.js');//...require appropriate file
var HanoiGame = require('./game.js');//...require appropriate file(look in /hanoi-core-solution)

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  new View(game, rootEl);
});
