const { createCopy } = require("./model/rooms");
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
  isFightInProgress = false;
  rooms = await createCopy();
  currentRoom = await findRoomByNumber(1);
  questions = require("./model/questions");
  currentEnemy = null;
  currentQuestion = null;
  player.hp = 500;
  player.inventory = [];
  player.attack = 100;
  player.armor = 0;
  let roomDescription = await describeRoom(currentRoom);
  return roomDescription;
}

function pickRandomQuestion() {
  let randomId = Math.floor(Math.random() * questions.length);
  let randomQuestion = questions[randomId];
  console.log(questions.length);
  questions.splice(randomId, 1);
  console.log(questions.length);
  return randomQuestion;
}

async function findRoomByNumber(number) {
  let room = await rooms[number - 1];
  return room;
}

async function move(door) {
  newRoom = await findRoomByNumber(door.goesTo);
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
      isFightInProgress = true;
      return `You have encountered ${enemy}. Prepare for lexical battle! Use /fight to continue.`;
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
      currentRoom.items = currentRoom.items.filter((i) => !item);
    }
  }
  for (door of currentRoom.doors) {
    description += "There is a door to the " + door.direction + ".<br/>";
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

function createQuestionPrompt() {
  currentQuestion = pickRandomQuestion();
  shuffledChoices = shuffleArray(currentQuestion.choices);
  questionPrompt = `<h2>Question</h2><p>${currentQuestion.question}</p>
  <h2>Choices</h2><p>${shuffledChoices.join(", ")}</p>
  <h2>Instructions</h2><p> Use /fight?submit=your+answer+here to answer the question.</p>`;
  return questionPrompt;
}

function displayPlayerInventory() {
  return player.inventory;
}

function fight(userSubmission) {
  if (userSubmission === currentQuestion.answer) {
    console.log(currentEnemy);
    player.attackEnemy(currentEnemy);
    if (currentEnemy.hp <= 0) {
      if (currentEnemy.name === "King Snoot") {
        return "You have defeated King Snoot and have thus acceded to his former throne! Congratulations!";
      }
      isFightInProgress = false;
      currentRoom.enemies = [];
      roomDescription = describeRoom(currentRoom);
      currentRoom.enemies = [];
      return `Correct! See the following rule:<br>${
        currentQuestion.explanation
      }<br><br>You defeated ${currentEnemy.name}. ${currentEnemy.die()}<br>
      ${roomDescription}`;
    }
    let explanation = currentQuestion.explanation;
    questionPrompt = createQuestionPrompt();
    return `${
      currentEnemy.name
    } says '${currentEnemy.congratulate()}'<br>${explanation}<br><br> Your attack did ${
      player.attack
    } damage. Enemy still has ${
      currentEnemy.hp
    } hp remaining.<br><br>Next question:<br><br>${questionPrompt}`;
  }
  currentEnemy.attackPlayer(player);
  console.log(player.hp);
  if (player.hp <= 0) {
    return `${
      currentEnemy.name
    } says '${currentEnemy.insult()}'<br><br>${explanation}<br>${
      currentQuestion.explanation
    }<br><br> The enemy's attack did ${
      currentEnemy.attack - player.armor
    } damage. You died!<br><br>Use /startGame to start a new game.`;
  }
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

function getObjectToSave() {
  return {
    rooms,
    currentRoom,
    currentQuestion,
    isFightInProgress,
    currentEnemy,
    questions,
    player,
  };
}

function loadGame(object) {
  rooms = object.rooms;
  currentRoom = object.currentRoom;
  currentQuestion = object.currentQuestion;
  isFightInProgress = object.isFightInProgress;
  currentEnemy = object.currentEnemy;
  questions = object.questions;
  player.attack = object.player.attack;
  player.hp = object.player.hp;
  player.armor = object.player.armor;
  player.inventory = object.player.inventory;
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
  getObjectToSave,
  loadGame,
  displayPlayerStats,
};
