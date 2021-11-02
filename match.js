const { findRoomById, createCopy } = require("./model/rooms");
const {
  noviceSnoot,
  intermediateSnoot,
  journeymanSnoot,
  masterSnoot,
  kingSnoot,
} = require("./model/enemies");
const questions = require("./model/questions");
const { player } = require("./model/player");
const items = require("./model/items");

let rooms;
let currentRoom;
let currentQuestion;
let currentEnemy;
let isFightInProgress = false;

async function startGame() {
  rooms = await createCopy();
  currentRoom = await findRoomByNumber(1);
  let openingMessage =
    "You wake up in a strange room. What is this place? <br/>";
  let roomDescription = await describeRoom(currentRoom);
  return openingMessage + roomDescription;
}

function pickRandomQuestion() {
  randomQuestion = questions[Math.floor(Math.random() * questions.length)];
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
        player.inventory.includes("The Key of Correlative Conjunction")
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
        player.inventory.includes("The Key, of Misused Commas")
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
      return `You have encountered a ${enemy}. Prepare for lexical battle! Use /fight to continue.`;
    }
  }
  if (currentRoom.items) {
    for (item of currentRoom.items) {
      description +=
        "You have found " + item + ". It was added to your inventory.<br/>";
      player.addToInventory(item);
      currentRoom.items = currentRoom.items.filter((i) => !item);
    }
  }
  for (door of currentRoom.doors) {
    description += "There is a door to the " + door.direction + ".<br/>";
  }
  return description;
}

function getEnemy() {
  let enemyToFight;
  for (enemy of currentRoom.enemies) {
    switch (enemy) {
      case "novice snoot":
        enemyToFight = Object.assign({}, noviceSnoot);
        break;
      case "intermediate snoot":
        enemyToFight = Object.assign({}, intermediateSnoot);
        break;
      case "journeyman snoot":
        enemyToFight = Object.assign({}, journeymanSnoot);
        break;
      case "master snoot":
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
  questionPrompt = `Question: ${currentQuestion.question}<br/>Choices: ${shuffledChoices}
  <br>Instructions: Use /fight?submit=your+answer+here to answer the question.`;
  return questionPrompt;
}

function displayPlayerInventory() {
  return player.inventory;
}

function fight(userSubmission) {
  if (userSubmission === currentQuestion.answer) {
    player.attackEnemy(currentEnemy);
    console.log(currentEnemy.hp);
    if (currentEnemy.hp <= 0) {
      if (currentEnemy.name === "King Snoot") {
        return "You have defeated King Snoot and have thus acceded to his former throne! Congratulations!";
      }
      isFightInProgress = false;
      currentRoom.enemies = [];
      roomDescription = describeRoom(currentRoom);
      currentRoom.enemies = [];
      return `You defeated ${currentEnemy.name}.<br>
      ${roomDescription}`;
    }
    questionPrompt = createQuestionPrompt();
    return `Correct. Your attack did ${player.attack} damage. Enemy still has ${currentEnemy.hp} hp remaining.<br><br>Next question:<br><br>${questionPrompt}`;
  }
  currentEnemy.attackPlayer(player);
  console.log(player.hp);
  if (player.hp <= 0) {
    return `Incorrect. The enemy's attack did ${
      currentEnemy.attack - player.armor
    } damage. You died!<br><br>Use /startGame to start a new game.`;
  }
  questionPrompt = createQuestionPrompt();
  return `Incorrect. The enemy's attack did ${
    currentEnemy.attack - player.armor
  } damage. You still have ${
    player.hp
  } hp remaining.<br><br>Next question:<br><br>${questionPrompt}`;
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
};
