let rooms = [
  {
    id: 1,
    doors: [2],
    description: 'The room appears empty. A door is at the other end.',
  },
  {
    id: 2,
    doors: [3, 1],
    description: 'Seems to a courtyard of some sort. A door sits directly across'
  },
  {
    id: 3,
    doors: [4, 2],
    description: 'room 3'
  },
  {
    id: 4,
    doors: [3],
    description: 'You made it to the end!'
  },

]

module.exports = {rooms}