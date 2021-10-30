const express = require("express");
const snoot = require("../app");
const router = express.Router();
const { findRoomById, updateRoom, createCopy } = require("../rooms");
const {
  noviceSnoot,
  intermediateSnoot,
  journeymanSnoot,
  masterSnoot,
  kingSnoot,
} = require("../enemies");
const questions = require("../questions");
const { player } = require("../player");

let inventory = [];
let rooms;
let currentRoom;
let currentQuestion;

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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function describeRoom(room, inventory) {
  let description = "";
  console.log(room);
  if (room.enemies) {
    for (enemy of room.enemies) {
      return `You have encountered a ${enemy}. Prepare for lexical battle! Use /fight to continue.`;
    }
  }
  if (room.items) {
    for (item of room.items) {
      description +=
        "You have found the " + item + ". It was added to your inventory.<br/>";
      inventory.push(item);
      room.items = room.items.filter((i) => !item);
      console.log(room.items);
    }
  }
  for (door of room.doors) {
    description += "There is a door to the " + door.direction + ".<br/>";
  }
  return description;
}

function getEnemy() {
  let enemyToFight;
  for (enemy of currentRoom.enemies) {
    switch (enemy) {
      case "novice snoot":
        enemyToFight = noviceSnoot;
        break;
      case "intermediate snoot":
        enemyToFight = intermediateSnoot;
        break;
      case "journeyman snoot":
        enemyToFight = journeymanSnoot;
        break;
      case "master snoot":
        enemyToFight = masterSnoot;
        break;
      case "King Snoot":
        enemyToFight = kingSnoot;
        break;
      default:
        break;
    }
  }
  return enemyToFight;
}

function fightEnemy(enemy) {}

router.get("/", (req, res) => {
  res.send("<h1>Welcome to Snoot Land</h1>");
});

router.get("/startGame", async (req, res) => {
  rooms = await createCopy();
  currentRoom = await findRoomByNumber(1);
  let openingMessage =
    "You wake up in a strange room. What is this place? <br/>";
  let roomDescription = describeRoom(currentRoom, inventory);
  res.send(openingMessage + roomDescription);
});

router.get("/describeRoom", async (req, res) => {
  let description = await describeRoom(currentRoom);
  res.send(description);
});

router.get("/move", async (req, res) => {
  let direction = req.query.direction;
  console.log(currentRoom);
  for (door of currentRoom.doors) {
    if (direction === door.direction) {
      if (!door.locked) {
        currentRoom = await move(door);
        return res.send(describeRoom(currentRoom, inventory));
      }
      if (
        currentRoom.roomNumber === 2 &&
        inventory.includes("The Key of Correlative Conjunction")
      ) {
        doorToChange = currentRoom.doors.find((door) => {
          return (door.goesTo = 5);
        });
        doorToChange.locked = false;
        currentRoom = await move(door);
        let successMessage = await describeRoom(currentRoom, inventory);
        return res.send(
          `You unlocked the door using The Key of Correlative Conjunction.<br/>${successMessage}`
        );
      }
      if (
        currentRoom.roomNumber === 14 &&
        inventory.includes("The Key, of Misused Commas")
      ) {
        doorToChange = currentRoom.doors.find((door) => {
          return (door.goesTo = 15);
        });
        doorToChange.locked = false;
        currentRoom = await move(door);
        let successMessage = await describeRoom(currentRoom, inventory);
        return res.send(
          `You unlocked the door using The Key, of Misused Commas.<br/>${successMessage}`
        );
      }
      let errorMessage = await describeRoom(currentRoom, inventory);
      return res.send(
        `The door is locked and you don't have the key!<br/>${errorMessage}`
      );
    }
  }

  return res.send("Error");
});

router.get("/viewInventory", (req, res) => {
  res.send(inventory);
});

router.get("/fight", (req, res) => {
  enemy = getEnemy();
  currentQuestion = pickRandomQuestion();
  shuffledChoices = shuffleArray(currentQuestion.choices);
  res.send(`Question: ${currentQuestion.question}<br/>Choices: ${shuffledChoices}
  <br>Instructions: Use /fight/answer?submit=your+answer+here to answer the question.`);
});

router.get("/fight/answer", (req, res) => {
  let userSubmission = req.query.submit;
  if (userSubmission === currentQuestion.answer) {
    return res.send("correct");
  }
  return res.send("incorrect");
});

module.exports = router;
