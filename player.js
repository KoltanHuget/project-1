player = {
  hp: 500,
  attack: 100,
  attackEnemy: function (enemy) {
    enemy.hp -= this.attack;
  },
};

module.exports = {
  player,
};
