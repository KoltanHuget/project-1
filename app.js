const {findRoomById} = require('./rooms');

async function move(direction, currentRoom) {
  for (door of currentRoom.doors) {
    if (direction === door.direction) {
      newRoom = await findRoomById(door.goesTo);
      return newRoom;
    }
  }
  console.log('please choose a valid direction')
  return currentRoom
}

function describeRoom(room) {
  let description = ''
  for (door of room.doors) {
    description += 'There is a door to the ' + door.direction + '.<br/>'
  }
  return description;
}

async function startGame() {
  let currentRoom = await findRoomById('617aab70dc5634e121058735');
  describeRoom(currentRoom);
  return currentRoom;
}

module.exports = {
  move,
  startGame,
  describeRoom,
}

