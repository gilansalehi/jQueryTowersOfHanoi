/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1);//...require appropriate file
	var HanoiGame = __webpack_require__(2);//...require appropriate file(look in /hanoi-core-solution)

	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new View(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function(){
	  window.View = window.View || {};

	  var View = window.View = function(game, dom){
	    this.game = game;
	    this.dom = dom;
	    this.setupTowers();
	    this.render();
	    this.lastClicked = -1;
	    $(this.dom).find("ul").on("click", function(e){
	      var currentTarget = $(e.currentTarget);
	      this.clickTower(currentTarget);
	    }.bind(this));
	  };

	  View.prototype.setupTowers = function () {
	    var stack = "<ul><li></li><li></li><li></li></ul>";
	    var startedStack = "<ul><li class='stone1 stone'></li><li class='stone2 stone'></li><li class='stone3 stone'></li></ul>";
	    $(this.dom).html(startedStack + stack + stack);
	  };

	  View.prototype.render = function () {
	    var that = this;
	    this.game.towers.forEach( function (tower, i) {
	      tower.forEach( function (piece, j) {
	        that.dom.find("ul:eq(" + i + ")").find("li:eq(" + (2 - j) + ")").html(piece);
	      });
	    });

	  };

	  View.prototype.clickTower = function (currentTarget){

	    var currentIndex = currentTarget.parent().children().index(currentTarget);
	    if (this.lastClicked !== -1){
	      this.move(this.lastClicked, currentIndex);
	      this.lastClicked = -1;
	    }
	    else{
	      this.lastClicked = currentIndex;
	    }
	  };

	  View.prototype.move = function (start, end) {
	    console.log(start, end);
	    this.game.move(start, end);
	    var $startTower = $(".hanoi").find("ul:eq(" + start + ")");
	    var stoneSize = $startTower.find("li").first().text();
	    var $endTower = $(".hanoi").find("ul:eq(" + end + ")");
	    $startTower.children().has(".stone" + stoneSize).removeClass(".stone" + stoneSize, ".stone");
	    $endTower.children().not(".stone").first().addClass(".stone" + stoneSize, ".stone");

	  };


	}());


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};

	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];

	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};

	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};

	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};

	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};

	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};

	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }

	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};

	module.exports = Game;


/***/ }
/******/ ]);