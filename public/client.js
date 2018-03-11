

// Authentication: 

// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '4b987275f063436bb33cfdee4da7fe22';
const redirectUri = 'https://guiltless-polyester.glitch.me';
const scopes = ['streaming', 'user-modify-playback-state', 'user-read-birthdate', 'user-read-email', 'user-read-private', 'user-top-read'];

// If there is no token, redirect to Spotify authorization
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
}


// --------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------- //

// Initialise the Web Playback SDK

let player, deviceId;

window.onSpotifyWebPlaybackSDKReady = function () {
  var accessToken = _token;
  player = new Spotify.Player({
    name: 'Junction 🇫🇮',
    getOAuthToken: function (callback) { callback(accessToken); }
  });

  // Error handling
  player.on('initialization_error', function (e) { console.log('Initialization Error', e); });
  player.on('authentication_error', function (e) { console.log('Authentication Error', e); });
  player.on('account_error', function (e) { console.log('Account Error', e); });
  player.on('playback_error', function (e) { console.log('Playback Error', e); });

  // Playback status updates
  player.on('player_state_changed', function (e) {
    console.log("Player state changed", e);
    updateCurrentTrack(e.track_window.current_track)
  });

  // Ready
  player.on('ready', function (data) {
    transferPlayback(data.device_id);
  });

  // Connect to the player!
  player.connect();
}

// Make a call using the token

getTopTracks();

let topTrackUris;

function getTopTracks() {
  $.get('/top-tracks?token=' + _token, function(tracks) {
    console.log(tracks)
    let uris = [];
    
    tracks.forEach(function(track) {
      let trackEl = $('<li>' + track.name + '</li>');
      trackEl.appendTo('#top-tracks');
      uris.push(track.uri);
    });
    
    topTrackUris = uris.join(',');
  });
}

function transferPlayback(deviceId) {
  $.post('/transfer?device_id=' + deviceId + '&token=' + _token)
    .then(function() {
      let alert = $('<div class="alert alert-success" role="alert">Sweet! You\'re now listening on ' + player._options.name + '</div>');
      alert.appendTo('#alert');
    });
}

function togglePlay() {
  player.togglePlay();
}

function play() {
  let uris = 'spotify:track:0FutrWIUM5Mg3434asiwkp,spotify:track:7Ctju5iILqGbvMKG6CgTl9';
  $.post('/play?uris=' + uris + '&token=' + _token);
}

function updateCurrentTrack(track) {
  $('#current-track').empty();
  let name = $('<h2>' + track.name + '</h2>');
  name.appendTo('#current-track');
}

var id = '4uLU6hMCjMI75M1A2tKUQC';

function push(){
  if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos){
              //pos.coords.latitude,pos.coords.longitude
            $.get('/audio-features?track='+id, function(data) {
              // "Data" is the object we get from the API. See server.js for the function that returns it.
              var upload = {};
              upload.Lat = pos.coords.latitude;
              upload.Lng = pos.coords.longitude;
              upload.features = data;
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;

              xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                  console.log(this.responseText);
                }
              });

              xhr.open("POST", "https://junction-de01.restdb.io/rest/inspire");
              xhr.setRequestHeader("content-type", "application/json");
              xhr.setRequestHeader("x-apikey", "a39a290979c6ca2cd72b3978b8efe597ef4c6");
              xhr.setRequestHeader("cache-control", "no-cache");

              xhr.send(upload);
            });
              
              
              
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
  
  
  
};
