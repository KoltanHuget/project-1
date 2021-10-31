player = {
  hp: 500,
  attack: 100,
  armor: 0,
  inventory: [],
  attackEnemy: function (enemy) {
    enemy.hp -= this.attack;
  },
  addToInventory: function (item) {
    if (item === "a tweed jacket") {
      this.armor += 100;
    } else if (item === "a pair of horn-rimmed spectacles") {
      this.attack += 100;
    }
    this.inventory.push(item);
  },
};

module.exports = {
  player,
};
