let noviceSnoot = {
  name: "Novice Snoot",
  hp: 100,
  attack: 100,
  attackPlayer: function (player) {
    let damageDealt = this.attack - player.armor;
    player.hp -= damageDealt;
  },
  congratulations: ["Okay, you got lucky on that one. Here's the full answer:"],
  insults: [
    "Fool! Here is why you are wrong:",
    "Imbecile! Your ineptitude titillates me. Here's the correct answer:",
    "Are you serious? That was child's play! Here's the correct answer:",
    "Are you even potty trained? Here's the right answer:",
  ],
  insult: function () {
    let randomId = Math.floor(Math.random() * this.insults.length);
    return this.insults[randomId];
  },
  die: function () {
    return "Novice Snoot popped and was sent flying around the room like a punctured balloon.";
  },
  congratulate: function () {
    let randomId = Math.floor(Math.random() * this.congratulations.length);
    return this.congratulations[randomId];
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
  insults: [
    "You are such an idiot! Allow me to correct your ignorance:",
    "Oh that's very cute, but the correct answer is:",
    "Rather than attempting to depose King Snoot, you should be at home playing with action figures. Here's the correct answer:",
    "Spoken like a true Descriptivist. The correct answer is:",
    "How charming! The correct answer, however, is:",
  ],
  congratulations: [
    "How did you know that? Have you been cheating? Here's the full answer:",
    "Even Descriptivists get lucky sometimes. Here's the full answer:",
    "Okay, that's correct, but I'll stump you on the next one!",
  ],
  insult: function () {
    let randomId = Math.floor(Math.random() * this.insults.length);
    return this.insults[randomId];
  },
  die: function () {
    return "Intermediate Snoot explodes; blood and viscera spray everywhere.";
  },
  congratulate: function () {
    let randomId = Math.floor(Math.random() * this.congratulations.length);
    return this.congratulations[randomId];
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
  insults: [
    "Not even close. Permit me to redress your ignorance:",
    "Your ignorance is charming. The correct answer is:",
    "Actually, that's incorrect. Allow me to enlighten you:",
    "How embarrassing for you. The correct answer is:",
  ],
  congratulations: [
    "Correct. But with such an easy question, who wouldn't get it right?",
    "Don't get too cocky; that one was easy.",
    "Ah hah! Actually, the answer is...oh wait...you're correct.",
  ],
  insult: function () {
    let randomId = Math.floor(Math.random() * this.insults.length);
    return this.insults[randomId];
  },
  die: function () {
    return "Out of humiliation, Journeyman Snoot dashes his own head against the wall and dies instantly.";
  },
  congratulate: function () {
    let randomId = Math.floor(Math.random() * this.congratulations.length);
    return this.congratulations[randomId];
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
  insults: [
    "How can you defeat King Snoot if you can't even beat me? Here is the correct answer:",
    "You'll never be a snoot. Here's the correct answer:",
    "I'm sure a universe exists in which that's correct English usage. But in this universe, the correct answer is:",
  ],
  congratulations: [
    "Very good. You are improving:",
    "Correct. Are you sure you aren't a snoot?",
    "Yes, that's right! You might not be useless after all.",
    "Impressive.",
    "That's right. It's been so long since I corrected someone. I feel lethargic.",
    "Wow, good job! Perhaps the prophecy is true...",
  ],
  insult: function () {
    let randomId = Math.floor(Math.random() * this.insults.length);
    return this.insults[randomId];
  },
  die: function () {
    return "Master Snoot disappears.";
  },
  congratulate: function () {
    let randomId = Math.floor(Math.random() * this.congratulations.length);
    return this.congratulations[randomId];
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
  insults: [
    "How dare you try to usurp my crown! Here's the correct answer:",
    "You dare try to depose me? Here's the correct answer:",
    "The ignorance of the common folk never ceases to surprise me. Here's the right answer:",
  ],
  congratulations: [
    "You are correct this time, but you'll never usurp my crown! Here's the full answer:",
    "Yes, but any churl could have anticipated that answer.",
    "Sure, but even a baseborn bastard could have answered that question correctly.",
    "Correct, but such thing are known even among the common rabble. I'll thwart you with this next question.",
    "You are correct. I feel my power draining...",
    "I may have underestimated you.",
    "Yes, but I shall rule Snoot Land forever!",
    "Yes, but even my ignoble jester could have answered that correctly.",
  ],
  insult: function () {
    let randomId = Math.floor(Math.random() * this.insults.length);
    return this.insults[randomId];
  },
  die: function () {
    return "King Snoot's servants pour into the room and exact revenge for years of poor treatment. They swarm around his body and pull him apart piece by piece.";
  },
  congratulate: function () {
    let randomId = Math.floor(Math.random() * this.congratulations.length);
    return this.congratulations[randomId];
  },
};

module.exports = {
  noviceSnoot,
  intermediateSnoot,
  journeymanSnoot,
  masterSnoot,
  kingSnoot,
};
