const express = require('express')
const app = express()
const router = require('./routes/router1')

app.use('/', router)

app.listen(3000, () => {
  console.log('listening on port 3000');
})