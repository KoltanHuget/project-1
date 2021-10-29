const express = require('express');
const snoot = require('../app')
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home Page');
})

router.get('/startGame', async (req, res) => {
  currentRoom = await snoot.startGame();
  let openingMessage = 'You wake up in a strange room. What is this place? <br/>'
  let roomDescription = snoot.describeRoom(currentRoom);
  res.send(openingMessage + roomDescription);
})

router.get('/move', async (req, res) => {
  let direction = req.query.direction
  currentRoom = await snoot.move(direction, currentRoom);
  let message = snoot.describeRoom(currentRoom)
  res.send(message)
})

module.exports = router;