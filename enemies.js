let noviceSnoot = {
  name: "Novice Snoot",
  hp: 100,
  attack: 100,
  attackPlayer: function (player) {
    let damageDealt = this.attack - player.armor;
    player.hp -= damageDealt;
  },
};

let intermediateSnoot = {
  name: "Intermediate Snoot",
  hp: 200,
  attack: 200,
  attackPlayer: function (player) {
    let damageDealt = this.attack - player.armor;
    player.hp -= damageDealt;
  },
};

let journeymanSnoot = {
  name: "Journeyman Snoot",
  hp: 300,
  attack: 300,
  attackPlayer: function (player) {
    let damageDealt = this.attack - player.armor;
    player.hp -= damageDealt;
  },
};

let masterSnoot = {
  name: "Master Snoot",
  hp: 500,
  attack: 500,
  attackPlayer: function (player) {
    let damageDealt = this.attack - player.armor;
    player.hp -= damageDealt;
  },
};

let kingSnoot = {
  name: "King Snoot",
  hp: 1000,
  attack: 1000,
  attackPlayer: function (player) {
    let damageDealt = this.attack - player.armor;
    player.hp -= damageDealt;
  },
};

module.exports = {
  noviceSnoot,
  intermediateSnoot,
  journeymanSnoot,
  masterSnoot,
  kingSnoot,
};
