const {
  createCopy,
  saveGameToDatabase,
  loadGameFromDatabase,
} = require("./model/rooms");
const {
  noviceSnoot,
  intermediateSnoot,
  journeymanSnoot,
  masterSnoot,
  kingSnoot,
} = require("./model/enemies");
let questions;
let { player } = require("./model/player");

let rooms;
let currentRoom;
let currentQuestion;
let currentEnemy;
let isFightInProgress = false;

async function startGame() {
  // reset global variables
  isFightInProgress = false;
  rooms = await createCopy();
  console.log("Rooms have been reset");
  currentRoom = await findRoomByNumber(1);
  console.log(`currentRoom set to ${currentRoom}`);
  questions = require("./model/questions");
  console.log(`${questions.length} questions have been retrieved.`);
  currentEnemy = null;
  console.log(`currentEnemy set to ${currentEnemy}`);
  currentQuestion = null;
  console.log(`currentQuestion set to ${currentQuestion}`);
  player.hp = 500;
  player.inventory = [];
  player.attack = 100;
  player.armor = 0;
  console.log(`player reset to ${player}`);
  let roomDescription = await describeRoom(currentRoom);
  return roomDescription;
}

function pickRandomQuestion() {
  let randomId = Math.floor(Math.random() * questions.length);
  let randomQuestion = questions[randomId];
  questions.splice(randomId, 1);
  console.log("Question removed from questions array");
  return randomQuestion;
}

async function findRoomByNumber(number) {
  let room = await rooms[number - 1];
  return room;
}

async function move(door) {
  newRoom = await findRoomByNumber(door.goesTo);
  console.log(`Player moved to ${newRoom.name}`);
  return newRoom;
}

async function checkMove(direction) {
  if (isFightInProgress) {
    return "You can't switch rooms while a fight is in progress!";
  }
  for (door of currentRoom.doors) {
    if (direction === door.direction) {
      if (!door.locked) {
        currentRoom = await move(door);
        return describeRoom(currentRoom);
      }
      if (
        currentRoom.roomNumber === 2 &&
        player.inventory.find((i) => {
          return i.name === "The Key of Correlative Conjunction";
        })
      ) {
        doorToChange = currentRoom.doors.find((door) => {
          return (door.goesTo = 5);
        });
        doorToChange.locked = false;
        currentRoom = await move(door);
        let successMessage = await describeRoom(currentRoom);
        return `You unlocked the door using The Key of Correlative Conjunction.<br/>${successMessage}`;
      }
      if (
        currentRoom.roomNumber === 14 &&
        player.inventory.find((i) => {
          return i.name === "The Key, of Misused Commas";
        })
      ) {
        doorToChange = currentRoom.doors.find((door) => {
          return (door.goesTo = 15);
        });
        doorToChange.locked = false;
        currentRoom = await move(door);
        let successMessage = await describeRoom(currentRoom);
        return `You unlocked the door using The Key, of Misused Commas.<br/>${successMessage}`;
      }
      let errorMessage = await describeRoom(currentRoom);
      return `The door is locked and you don't have the key!<br/>${errorMessage}`;
    }
  }
  console.log(currentRoom.doors);
  return "You can't move that way; there's no door.";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function describeRoom() {
  let description = "";
  if (currentRoom.enemies) {
    for (enemy of currentRoom.enemies) {
      currentEnemy = getEnemy();
      console.log(`currentEnemy set to ${currentEnemy.name}`);
      console.log(`isFightInProgress set to ${isFightInProgress}`);
      isFightInProgress = true;
      questionPrompt = fight();
      return `You have encountered ${enemy}. Prepare for lexical battle! <br><br>Submit your answer by clicking one of the choices below.<br><br>${questionPrompt}`;
    }
  }
  if (currentRoom.items) {
    for (item of currentRoom.items) {
      description +=
        "You have found " +
        item.name +
        ". It was added to your inventory.<br/>";
      if (item.type === "weapon" || item.type === "armor") {
        description += `Description: ${item.description}<br>`;
      }
      player.addToInventory(item);
      console.log(`${item.name} added to inventory`);
      currentRoom.items = currentRoom.items.filter((i) => !item);
      console.log(`${item.name} removed from map`);
    }
  }
  for (door of currentRoom.doors) {
    let link;
    if (door.direction === "north") {
      link = "North";
    } else if (door.direction === "south") {
      link = "South";
    } else if (door.direction === "east") {
      link = "East";
    } else {
      link = "West";
    }
    description += `There is a door to the <a href=/move${link}>${door.direction}</a>.<br/>`;
  }
  return `<h1>${currentRoom.name}</h1>
  <p>${currentRoom.description}</p>
  <p>${description}</p>`;
}

function getEnemy() {
  let enemyToFight;
  for (enemy of currentRoom.enemies) {
    switch (enemy) {
      case "a novice snoot":
        enemyToFight = Object.assign({}, noviceSnoot);
        break;
      case "an intermediate snoot":
        enemyToFight = Object.assign({}, intermediateSnoot);
        break;
      case "a journeyman snoot":
        enemyToFight = Object.assign({}, journeymanSnoot);
        break;
      case "a master snoot":
        enemyToFight = Object.assign({}, masterSnoot);
        break;
      case "King Snoot":
        enemyToFight = Object.assign({}, kingSnoot);
        break;
      default:
        break;
    }
  }
  return enemyToFight;
}

function createLinksForAnswerChoices(choices) {
  let htmlString = "";
  let link;
  for (answerChoice of choices) {
    link = answerChoice.replace(/ /g, "+");
    htmlString += `<a href=/fight?submit=${link}>${answerChoice}</a>, `;
  }
  return htmlString;
}

function createQuestionPrompt() {
  currentQuestion = pickRandomQuestion();
  console.log(`currentQuestion changed to ${currentQuestion.question}`);
  shuffledChoices = shuffleArray(currentQuestion.choices);
  console.log(`Answer choices shuffled`);
  answerChoicesString = createLinksForAnswerChoices(shuffledChoices);
  questionPrompt = `<h2>Question</h2><p>${currentQuestion.question}</p>
  <h2>Choices</h2><p>${answerChoicesString}</p>
  <h2>Instructions</h2><p>Submit your answer by clicking on the choices below.</p>`;
  return questionPrompt;
}

function displayPlayerInventory() {
  return player.inventory;
}

function fight(userSubmission = "init") {
  if (!isFightInProgress) {
    return "Error. No fight in progress. Use /describeRoom to describe the room you're in.";
  }
  if (userSubmission === "init") {
    questionPrompt = createQuestionPrompt();
    return questionPrompt;
  }

  if (userSubmission === currentQuestion.answer) {
    // if player answered correctly
    console.log("player answered question correctly");
    player.attackEnemy(currentEnemy);
    if (currentEnemy.hp <= 0) {
      // if you've defeated any enemy
      if (currentEnemy.name === "King Snoot") {
        // if you've just defeated King Snoot
        currentRoom.enemies = [];
        console.log("player wins game");
        isFightInProgress = false;
        return `<h1>Victory!</h1>
        <p>You have defeated King Snoot and have thus acceded to his former throne! Congratulations!</p>
        <p>Click <a href=/describeRoom>here</a> to describe current room. </p>
        <p>Click <a href=/startGame>here</a> to start a new game. </p>`;
      }
      // if you've defeated any enemy other than King Snoot
      isFightInProgress = false;
      console.log(`isFightInProgress set to ${isFightInProgress}`);
      currentRoom.enemies = [];
      roomDescription = describeRoom(currentRoom);
      currentRoom.enemies = [];
      return `Correct! See the following rule:<br>${
        currentQuestion.explanation
      }<br><br>You defeated ${currentEnemy.name}. ${currentEnemy.die()}<br>
      ${roomDescription}`;
    }
    // if correct and enemy still alive
    let explanation = currentQuestion.explanation;
    questionPrompt = createQuestionPrompt();
    return `${
      currentEnemy.name
    } says '${currentEnemy.congratulate()}'<br><br>${explanation}<br><br> Your attack did ${
      player.attack
    } damage. Enemy still has ${
      currentEnemy.hp
    } hp remaining.<br><br>Next question:<br><br>${questionPrompt}`;
  }
  // player answered incorrectly
  console.log("player answered incorrectly.");
  currentEnemy.attackPlayer(player);
  console.log(player.hp);
  if (player.hp <= 0) {
    // if player has been killed
    return `${currentEnemy.name} says '${currentEnemy.insult()}'<br><br>${
      currentQuestion.explanation
    }<br><br> The enemy's attack did ${
      currentEnemy.attack - player.armor
    } damage. You died!<br><br>Click /startGame to start a new game.`;
  }
  // if player still alive
  let explanation = currentQuestion.explanation;
  questionPrompt = createQuestionPrompt();
  return `${
    currentEnemy.name
  } says '${currentEnemy.insult()}'<br><br>${explanation}<br><br> The enemy's attack did ${
    currentEnemy.attack - player.armor
  } damage. You still have ${
    player.hp
  } hp remaining.<br><br>Next question:<br><br>${questionPrompt}`;
}

async function saveGame() {
  if (isFightInProgress) {
    // can't save while game in progress
    return false;
  }
  savedId = await saveGameToDatabase({
    rooms,
    currentRoom,
    currentQuestion,
    isFightInProgress,
    currentEnemy,
    questions,
    player,
  });
  return savedId;
}

async function loadGame(id) {
  loadedGame = await loadGameFromDatabase(id);
  rooms = loadedGame.rooms;
  currentRoom = loadedGame.currentRoom;
  currentQuestion = loadedGame.currentQuestion;
  isFightInProgress = loadedGame.isFightInProgress;
  currentEnemy = loadedGame.currentEnemy;
  questions = loadedGame.questions;
  player.attack = loadedGame.player.attack;
  player.hp = loadedGame.player.hp;
  player.armor = loadedGame.player.armor;
  player.inventory = loadedGame.player.inventory;
  console.log("A saved game has been loaded.");
}

function displayPlayerStats() {
  let statsString = `HP remaining: ${player.hp}<br>
  attack: ${player.attack}<br>
  armor: ${player.armor}`;
  return statsString;
}

module.exports = {
  startGame,
  pickRandomQuestion,
  findRoomByNumber,
  move,
  checkMove,
  shuffleArray,
  describeRoom,
  getEnemy,
  createQuestionPrompt,
  displayPlayerInventory,
  fight,
  saveGame,
  loadGame,
  displayPlayerStats,
};
