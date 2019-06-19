const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pool = require('./database/index')

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('got')
})

app.get('/entry', (req, res) => {
  
})

app.post('/api/entry', (req, res) => {

})


app.listen(PORT, () => {
  console.log('listening on port 3000')
})