// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var acrcloud = require('acrcloud');

var acr = new acrcloud({
    host: 'identify-eu-west-1.acrcloud.com',
    access_key: '472a28e65468abe4d7ff612ce770bdb9',
    access_secret: 'GBRhEOeX8NykVNXt4KNdhyyfe9ukGHBszfdxEi4b'
});
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/identify", function (request, response) {
  var spotify_track_id = "none";
  const buf = Buffer.from(request.body.file.split(",")[1],'base64');
  //console.log(buf);
  acr.identify(buf).then(metadata => {
    console.log(metadata);
    
    console.log("lallalalsdfldf;====-=--=-=-=-=-=-;")
    // var external = metadata.metadata.music[0].external_metadata;
    // console.log(external);
    
    status = metadata.status.msg
    
    if(status === 'Success'){
      if("music" in metadata.metadata){
      if (metadata.metadata.music.length >0 )
        {
          var external_metadata = metadata.metadata.music[0].external_metadata;
          console.log("external-_metadata");
          console.log(external_metadata);
          if("spotify" in external_metadata)
            {
              console.log(external_metadata);
              spotify_track_id = external_metadata.spotify.track.id
              
              console.log(external_metadata.spotify.track.id)
            }
          
          
        }
    }
    }
    
    response.send(spotify_track_id);

  })

});

app.get('/audio-features', function (request, response) {
  spotifyApi.setAccessToken(request.query.token);
  
  var track_id = request.query.track;
  console.log("id =" + track_id)
  
  // Get the audio features for a track ID
  spotifyApi.getAudioFeaturesForTrack(track_id)
    .then(function(data) {
    
      //Send the audio features object
      response.send(data.body);
    
    }, function(err) {
      console.error(err);
    });
});



app.post('/play', function (req, res) {
  spotifyApi.setAccessToken(req.query.token);
//  spotifyApi.transferMyPlayback()
  
  
  // Play specified tracks
  spotifyApi.play({uris: req.query.uris.split(',')})
    .then(function(data) {
      res.sendStatus(200);
    }, function(err) {
      console.error(err);
    });
});


app.post('/transfer', function (req, res) {
  spotifyApi.setAccessToken(req.query.token);
  console.log(req.query)
  
  // Transfer playback to specified device
  spotifyApi.transferMyPlayback({device_ids: [req.query.device_id]})
    .then(function(data) {
      res.sendStatus(200);
    }, function(err) {
      console.error(err);
    });
});