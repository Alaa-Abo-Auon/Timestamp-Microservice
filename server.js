// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res, next) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", (req, res) => {

  const months = {
    'January': '01',
    'February': '02',
    'March': '03',
    'April': '04',
    'May': '05',
    'June': '06',
    'July': '07',
    'August': '08',
    'September': '09',
    'October': '10',
    'November': '11',
    'December':'12'
  };

  const input = req.params.date;

  if(typeof input !== 'undefined'){
    
    if(input.includes(" ")){
      let day = input.slice(0,2);
      let month = input.slice(3,-5);
      let year = input.slice(-4);
      let date = (year+"-"+months[month]+"-"+day);
      let d2 = new Date(date); 
      res.json({
        unix: Date.parse(d2),
        utc: d2.toUTCString()
      })
    }
  }

  if(input == null){
    res.json({ unix: Date.now(), utc: Date().toString() });
  
  }else{
    
    let d;
    
    if(input.includes("-")) {
    
      d = new Date(input);
      if (d == "Invalid Date"){
        res.json({ error : "Invalid Date" });
      }else{
        res.json({
          unix: Date.parse(input),
          utc: d.toUTCString()
        });
      };
    
    }else{
      
      d = new Date(input / 1);
      if (d == "Invalid Date"){
        res.json({ error : "Invalid Date" });
      }else{
        var date = new Date(d);
        res.json({
          unix: parseInt(input),
          utc: d.toUTCString()
        });
      };
    };
  };
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
