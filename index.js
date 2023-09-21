const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

// Get main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Check page
app.get('/check', (req, res) => {
  res.json({message: 'Hello World'})
});

// Users array
const users = []
const userLogs = []

// Incrementing counter
let counter = 0;

// Create users
app.post('/api/users', (req, res) => {
  try {
    const user = { username: req.body.username, _id: String(counter)}
    users.push(user);
    userLogs.push({_id: counter, exercises:[]})
    counter++;
    res.json(user);
  } catch (error) {
    res.json({error: error.message});
  }
})

// Get users
app.get('/api/users', (req, res) => {
  try {
    res.send(users);
  } catch (error) {
    console.log(error)
    res.json({error: error.message});
  }
})

// Add exercises
app.post('/api/users/:_id/exercises', (req, res) => {
  try {
    const _id = req.params._id;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = req.body.date || new Date().toDateString();
    const user = users.find(user => user._id == _id);
    const exercise = { description, duration, date};
    userLogs[_id].exercises.push(exercise);
    res.json({...user, description, duration, date: new Date(date).toDateString()});
  } catch (error) {
    res.json({error: error.message});
  }
})

// Get user logs
app.get('/api/users/:_id/logs', (req, res) => {
  try {
    const _id = req.params._id;
    // const user = users.find(user => user._id == _id);
    let userExercises = userLogs[_id].exercises;
    const numberOfExercises = userExercises.length;
    const from = req.query.from;
    const to = req.query.to;
    const limit = Number(req.query.limit);
    if (from) {
      const fromDate = new Date(from);
      userExercises = userExercises.filter(exercise => new Date(exercise.date).getTime() >= new Date(fromDate).getTime());
    }
    if (to) {
      const toDate = new Date(to);
      userExercises = userExercises.filter(exercise => new Date(exercise.date).getTime() <= new Date(toDate).getTime());
    }
    if (limit) {
      userExercises = userExercises.slice(0, limit);
    }
    res.json({ count: numberOfExercises, log: userExercises});
  } catch (error) {
    res.json({error: error.message});
  }
})  


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
