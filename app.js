const { findRoomById, updateRoom } = require("./rooms");

async function move(door) {
  newRoom = await findRoomByNumber(door.goesTo);
  return newRoom;
}

async function startGame() {
  let currentRoom = await findRoomById("617aab70dc5634e121058735");
  describeRoom(currentRoom);
  return currentRoom;
}

module.exports = {
  startGame,
  move,
};
