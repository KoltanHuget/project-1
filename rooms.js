const { ObjectId } = require("bson");
const { Collection } = require("mongodb");
const db = require("./db");

async function createRoom(roomData) {
  let roomsCollection = await db.getCollection("mapCopy");
  let insertResult = await roomsCollection.insertOne(roomData);
  return insertResult.insertedId;
}

async function findCopyById(id) {
  let copyCollection = await db.getCollection("mapCopy");
  let copy = await copyCollection.findOne({ _id: ObjectId(id) });
  return copy;
}

async function findRoomById(id) {
  let roomsCollection = await db.getCollection("mapCopy");
  let room = await roomsCollection.findOne({ _id: ObjectId(id) });
  return room;
}

async function findCopyRoomById(docId, roomId) {
  let copy = await findCopyById(docId);
}

async function deleteRoomById(id) {
  let roomsCollection = await db.getCollection("rooms");
  return roomsCollection.deleteOne({ _id: ObjectId(id) });
}

async function findRoomByNumber(number) {
  let roomsCollection = await db.getCollection("rooms");
  let room = await roomsCollection.findOne({ roomNumber: number });
  return room;
}

async function saveCopy() {
  new_array = [];
  for (let i = 1; i < 16; i++) {
    let roomToAdd = await findRoomByNumber(i);
    delete roomToAdd._id;
    new_array.push(roomToAdd);
  }
  let newId = await createRoom({ new_array });
  return newId;
}

async function createCopy() {
  new_array = [];
  for (let i = 1; i < 16; i++) {
    let roomToAdd = await findRoomByNumber(i);
    delete roomToAdd._id;
    await new_array.push(roomToAdd);
  }
  return new_array;
}

async function findRoomByUnknownId(number) {
  room = await findRoomByNumber(number);
  roomId = room._id.id;
  room = await findRoomById(roomId);
  return room;
}

async function updateRoom(id, newData) {
  let roomsCollection = await db.getCollection("roomsToUse");
  return roomsCollection.updateOne({ _id: ObjectId(id) }, { $set: newData });
}

module.exports = {
  findRoomById,
  createCopy,
};
