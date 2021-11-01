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
} = require("../app");
const router = express.Router();
const { findRoomById, updateRoom, createCopy } = require("../rooms");
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
    questionPrompt = createQuestionPrompt();
    return res.send(questionPrompt);
  }
  let userSubmission = req.query.submit;
  return res.send(fight(userSubmission));
});

module.exports = router;
