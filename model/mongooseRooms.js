const mongoose = require("./mongooseDb");

const Room = mongoose.model("Room", {
  roomNumber: Number,
  doors: [Object],
  items: Array,
  enemies: Array,
});

async function createRoom(roomData) {
  let newRoom = new Room(roomData);
  let createdRoom = await newRoom.save();
  return createdRoom.id;
}

async function findRoomById(id) {
  return Room.findById(id);
}

async function findRoomByName(roomName) {
  return Room.findOne({ name: roomName });
}

async function listRooms() {
  return Room.find({});
}
