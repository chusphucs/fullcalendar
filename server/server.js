const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/calendar' , {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
});

app.use('/api/calendar', require('./Controllers/CalendarController'))

app.listen(5000, () => console.log("Server is listening on port 5000"));