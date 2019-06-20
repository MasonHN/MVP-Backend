const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {pool} = require('./database/index')
const fs = require('fs');

const PORT = process.env.PORT || 3000;


app.use(bodyParser());

app.get('/', (req, res) => {
  res.send('got')
})

app.get('/api/entry', (req, res) => {
  console.log(req.query);
  pool.getConnection()
    .then((conn) => {
      conn.query(`Select Exercise, Sleep, Date, Work, Relaxation, Breakfast, Lunch, Dinner, Snacks, Social_Interactions from entries where physical_mood = '${req.query.mood}'`)
      .then((results) => {
        res.send(results)
      })
      .catch(err => {
        console.log('error', err);
        conn.end();
        res.end();
      })
    })
    // .catch((err) => {
    //   res.send(err)
    // })
})

app.post('/api/entry', (req, res) => {
  console.log(req.body);
  let query = '';
  if (req.body.activites) {
    query = `INSERT INTO 
    entries(Exercise, Sleep, Date, Work, Relaxation, Breakfast, Lunch, Dinner, Snacks, Social_Interactions) 
    Values 
    (${req.body.exercise}, ${req.body.sleep}, '${req.body.date}', ${req.body.work}, ${req.body.relaxation}, '${req.body.breakfast}', '${req.body.lunch}', '${req.body.dinner}', '${req.body.snacks}', '${req.body.socialInteractions}')`
  } else {
    query = `INSERT INTO 
      entries(emotional_mood, mental_mood, physical_mood, medical_mood) 
      Values 
      ('${req.body.emotional}', '${req.body.mental}', '${req.body.physical}', '${req.body.medical}')`
  }
  pool.getConnection()
    .then((conn) => {
      conn.query(query)
      .then((results) => {
        conn.end();
        res.send(results)
      })
      .catch(err => {
        console.log('error', err);
        conn.end();
        res.end();
      })
    })
  .catch(err => {
    console.log('error', err);
  })
});


app.listen(PORT, () => {
  console.log('listening on port 3000')
})

// var emotional = ['Depressed', 'Sad', 'Average', 'Happy', 'Complete Bliss'];
// var mental = ['Scattered', 'Unproductive', 'Marginally Focused', 'Completely Focused', 'Zen God'];
// var physical = ['Awful', 'Tired', 'Average', 'Energetic', 'God-Like'];
// var medical = ['Sick - In Lots of Pain', 'Sick - Common Illness', 'Somewhat Normal', 'Mostly Normal', 'Completely Normal'];
// var meals = ['None', 'Unhealthy', 'Somewhat Unhealthy', 'Average', 'Somewhat Healthy', 'Healthy'];
// var social = ['yes', 'no'];

// for (let i = 1; i <= 31; i++) {
//   let data = `2019/1/${i}, ${Math.floor(Math.random() * 9) * 15}, ${Math.ceil(Math.random() * 16)}, ${Math.ceil(Math.random() * 16)}, ${Math.ceil(Math.random() * 16)}, ${social[Math.floor(Math.random() * 2)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${emotional[Math.floor(Math.random() * 5)]}, ${mental[Math.floor(Math.random() * 5)]}, ${physical[Math.floor(Math.random() * 5)]}, ${medical[Math.floor(Math.random() * 5)]} \n`

//   fs.appendFileSync('data.csv', data, (err) => {
//       if (err) {
//           console.log('error', err);
//       }
//   })
  
// };

// for (let i = 1; i <= 28; i++) {
//   let data = `2019/2/${i}, ${Math.floor(Math.random() * 9) * 15}, ${Math.ceil(Math.random() * 16)}, ${Math.ceil(Math.random() * 16)}, ${Math.ceil(Math.random() * 16)}, ${social[Math.floor(Math.random() * 2)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${emotional[Math.floor(Math.random() * 5)]}, ${mental[Math.floor(Math.random() * 5)]}, ${physical[Math.floor(Math.random() * 5)]}, ${medical[Math.floor(Math.random() * 5)]} \n`

//   fs.appendFileSync('data.csv', data, (err) => {
//       if (err) {
//           console.log('error', err);
//       }
//   })
  
// };

// for (let i = 1; i <= 31; i++) {
//   let data = `2019/3/${i}, ${Math.floor(Math.random() * 9) * 15}, ${Math.ceil(Math.random() * 16)}, ${Math.ceil(Math.random() * 16)}, ${Math.ceil(Math.random() * 16)}, ${social[Math.floor(Math.random() * 2)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${emotional[Math.floor(Math.random() * 5)]}, ${mental[Math.floor(Math.random() * 5)]}, ${physical[Math.floor(Math.random() * 5)]}, ${medical[Math.floor(Math.random() * 5)]} \n`

//   fs.appendFileSync('data.csv', data, (err) => {
//       if (err) {
//           console.log('error', err);
//       }
//   })
  
// };

// for (let i = 1; i <= 30; i++) {
//   let data = `2019/4/${i}, ${Math.floor(Math.random() * 9) * 15}, ${Math.ceil(Math.random() * 16)}, ${Math.ceil(Math.random() * 16)}, ${Math.ceil(Math.random() * 16)}, ${social[Math.floor(Math.random() * 2)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${emotional[Math.floor(Math.random() * 5)]}, ${mental[Math.floor(Math.random() * 5)]}, ${physical[Math.floor(Math.random() * 5)]}, ${medical[Math.floor(Math.random() * 5)]} \n`

//   fs.appendFileSync('data.csv', data, (err) => {
//       if (err) {
//           console.log('error', err);
//       }
//   })
  
// };

// for (let i = 1; i <= 31; i++) {
//   let data = `2019/5/${i}, ${Math.floor(Math.random() * 9) * 15}, ${Math.ceil(Math.random() * 16)}, ${Math.ceil(Math.random() * 16)}, ${Math.ceil(Math.random() * 16)}, ${social[Math.floor(Math.random() * 2)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${meals[Math.floor(Math.random() * 6)]}, ${emotional[Math.floor(Math.random() * 5)]}, ${mental[Math.floor(Math.random() * 5)]}, ${physical[Math.floor(Math.random() * 5)]}, ${medical[Math.floor(Math.random() * 5)]} \n`

//   fs.appendFileSync('data.csv', data, (err) => {
//       if (err) {
//           console.log('error', err);
//       }
//   })
  
// };