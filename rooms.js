const { ObjectId } = require('bson');
const { Collection } = require('mongodb');
const db = require('./db');

async function createRoom(roomData) {
  let roomsCollection = await db.getCollection('rooms');
  let insertResult = await roomsCollection.insertOne(roomData);
  return insertResult.insertedId
}

async function findRoomById(id) {
  let roomsCollection = await db.getCollection('rooms')
  let room = await roomsCollection.findOne({_id: ObjectId(id)});
  return room;
}

async function deleteRoomById(id) {
  let roomsCollection = await db.getCollection('rooms')
  return roomsCollection.deleteOne({_id: ObjectId(id)});
}

async function findRoomByNumber(number) {
  let roomsCollection = await db.getCollection('rooms')
  let room = await roomsCollection.findOne({roomNumber: number});
  return room;
}

async function createFifteenRooms() {
  for (let i = 1; i < 16; i++) {
    let newId = await createRoom({roomNumber: i});
    findRoomById(newId);
  }
}

async function findRoomByUnknownId(number) {
  room = await findRoomByNumber(number);
  roomId = room._id.id;
  room = await findRoomById(roomId);
  return room
}

async function updateRoom(id, newData) {
  let roomsCollection = await db.getCollection('rooms');
  return roomsCollection.updateOne({_id: ObjectId(id)}, {$set: newData});
}

async function test() {
  await updateRoom('617aab70dc5634e12105873f', {roomNumber: 11});
}

module.exports = {
  findRoomById,
}

