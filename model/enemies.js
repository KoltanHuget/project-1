let noviceSnoot = {
  name: "Novice Snoot",
  hp: 100,
  attack: 100,
  attackPlayer: function (player) {
    let damageDealt = this.attack - player.armor;
    player.hp -= damageDealt;
  },
  insult: function () {
    return "Fool! Here is why you are wrong:";
  },
  die: function () {
    return "Novice Snoot popped and was sent flying around the room like a punctured balloon.";
  },
  congratulate: function () {
    return "Okay, you got lucky on that one. Here's the full answer:";
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
  insult: function () {
    return "You are such an idiot! Allow me to correct your ignorance:";
  },
  die: function () {
    return "Intermediate Snoot explodes; blood and viscera spray everywhere.";
  },
  congratulate: function () {
    return "How did you know that? Have you been cheating? Here's the full answer:";
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
  insult: function () {
    return "Not even close. Permit me to redress your ignorance:";
  },
  die: function () {
    return "Out of humiliation, Journeyman Snoot dashes his own head against the wall and dies instantly.";
  },
  congratulate: function () {
    return "Everyone gets lucky sometimes. Here's the full answer:";
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
  insult: function () {
    return "How can you defeat King Snoot if you can't even beat me? Here is the correct answer:";
  },
  die: function () {
    return "Master Snoot disappears.";
  },
  congratulate: function () {
    return "Very good. You are improving:";
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
  insult: function () {
    return "How dare you try to usurp my crown! Here's the correct answer:";
  },
  die: function () {
    return "King Snoot's servants pour into the room and exact revenge for years of poor treatment. They swarm around his body and pull him apart piece by piece.";
  },
  congratulate: function () {
    return "You are correct this time, but you'll never usurp my crown! Here's the full answer:";
  },
};

module.exports = {
  noviceSnoot,
  intermediateSnoot,
  journeymanSnoot,
  masterSnoot,
  kingSnoot,
};
