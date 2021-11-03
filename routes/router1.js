const express = require("express");
const {
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
} = require("../app");
const router = express.Router();
const {
  findRoomById,
  updateRoom,
  createCopy,
  saveGameToDatabase,
  loadGameFromDatabase,
} = require("../model/rooms");
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

router.get("/startGame", async (req, res) => {
  let message = await startGame();
  res.send(message);
});

router.get("/describeRoom", async (req, res) => {
  let description = describeRoom();
  res.send(description);
});

router.get("/moveNorth", async (req, res) => {
  message = await checkMove("north");
  res.send(message);
});

router.get("/moveEast", async (req, res) => {
  message = await checkMove("east");
  res.send(message);
});

router.get("/moveSouth", async (req, res) => {
  message = await checkMove("south");
  res.send(message);
});

router.get("/moveWest", async (req, res) => {
  message = await checkMove("west");
  res.send(message);
});

router.get("/viewInventory", (req, res) => {
  res.send(displayPlayerInventory());
});

router.get("/fight", (req, res) => {
  if (!req.query.submit) {
    return res.send(
      "Please submit an answer using /fight?submit=your+answer+here"
    );
  }
  return res.send(fight(req.query.submit));
});

router.get("/save", async (req, res) => {
  object = await getObjectToSave();
  console.log(`Object ${object} saved.`);
  savedId = await saveGameToDatabase(object);
  res.send(`Use the id ${savedId} to load and resume this game.`);
});

router.get("/load", async (req, res) => {
  let gameId = req.query.id;
  let loadedGame = await loadGameFromDatabase(gameId);
  await loadGame(loadedGame);
  let description = await describeRoom();
  res.send(description);
});

router.get("/viewHealth", (req, res) => {
  stats = displayPlayerStats();
  if (stats) {
    return res.send(stats);
  }
  return res.send("You must start the game first.");
});

module.exports = router;
