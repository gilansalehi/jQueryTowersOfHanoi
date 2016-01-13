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
