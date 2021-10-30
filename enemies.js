let noviceSnoot = {
  hp: 100,
  attack: 100,
  attackPlayer: function () {
    player.health -= this.attack;
  },
};

let intermediateSnoot = {
  hp: 200,
  attack: 200,
  attackPlayer: function () {
    player.health -= this.attack;
  },
};

let journeymanSnoot = {
  hp: 300,
  attack: 300,
  attackPlayer: function () {
    player.health -= this.attack;
  },
};

let masterSnoot = {
  hp: 500,
  attack: 500,
  attackPlayer: function () {
    player.health -= this.attack;
  },
};

let kingSnoot = {
  hp: 1000,
  attack: 1000,
  attackPlayer: function () {
    player.health -= this.attack;
  },
};

module.exports = {
  noviceSnoot,
  intermediateSnoot,
  journeymanSnoot,
  masterSnoot,
  kingSnoot,
};
