const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
var MONGODB_URI = 'mongodb://heroku_lb65vn4c:e2g1o27v5ekvkpes9jqqbmv5kd@ds219191.mlab.com:19191/heroku_lb65vn4c'
mongoose.connect(MONGODB_URI); //|| "mongodb://localhost/nytimesreact");

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
