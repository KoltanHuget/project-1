player = {
  hp: 500,
  attack: 100,
  armor: 0,
  inventory: [],
  attackEnemy: function (enemy) {
    enemy.hp -= this.attack;
  },
  addToInventory: function (item) {
    if (item.name === "a tweed jacket") {
      this.armor += 100;
    } else if (item.name === "The Horn-Rimmed Spectacles of Perspicacity") {
      this.attack += 100;
    }
    this.inventory.push(item);
  },
};

module.exports = {
  player,
};
