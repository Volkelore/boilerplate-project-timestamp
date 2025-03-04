// index.js
// where your node app starts
let bodyParser = require('body-parser');

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Add middleware that interprets...?
app.use(bodyParser.urlencoded({extended: false}))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



//Custom code lies below
// First, add get endpoint for the 'api' enpoint
app.get("/api/:date?", function (req, res) {
  let t = req.params.date;
  let d;
  if (!isNaN(Number(t)))
  {
    console.log(Number(t));
    d = new Date(Number(req.params.date));
  }
  else
  {
    d = new Date(req.params.date);
  }
  if (t === undefined)
  {
    let currentTime = new Date();
    res.json({unix: Date.parse(currentTime), utc: currentTime.toUTCString()});
  }
  else if (d == "Invalid Date")
  {
    res.json({error: "Invalid Date"});
  }
  else
    res.json({unix: Date.parse(d), utc: d.toUTCString()});
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
