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
const redirectUri = 'https://enormous-liver.glitch.me';
const scopes = ['streaming', 'user-modify-playback-state', 'user-read-birthdate', 'user-read-email', 'user-read-private', 'user-top-read'];

// If there is no token, redirect to Spotify authorization
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
}


// --------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------- //

// Initialise the Web Playback SDK

let player, deviceId;

var my_device_id

window.onSpotifyWebPlaybackSDKReady = function () {
  var accessToken = "BQBeE7vCwkyelYl2T74F3170rPuk-2nwhJhtwmgwVX0xhJ6v8UB1gEMas1cqapqUIphMNgyNskHyoSDln9anLMrnfOvsfIpW2p_DP9Qd18vauKln19ViNqBm3S7Uu4O4BO38VMFSNcFld3y5Cn0tfyyXhhT3P2z2Aait";
  player = new Spotify.Player({
    name: 'dipoli',
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
    my_device_id = data.device_id
   // transferPlayback(data.device_id);
    console.log("player on ready")
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

function transferPlayback(deviceId,cb) {
  $.post('/transfer?device_id=' + deviceId + '&token=' + _token)
    .then(cb);
}

function togglePlay() {
  player.togglePlay();
}

function play(cb) {
  let uris = 'spotify:track:0FutrWIUM5Mg3434asiwkp,spotify:track:7Ctju5iILqGbvMKG6CgTl9';
  console.log("play()")
  $.post('/play?uris=' + uris + '&token=' + _token).then(cb);
}

function updateCurrentTrack(track) {
  $('#current-track').empty();
  let name = $('<h2>' + track.name + '</h2>');
  name.appendTo('#current-track');
}

function push(e, cb){
  console.log("enter push")
  if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos){
              //pos.coords.latitude,pos.coords.longitude
            console.log("lst="+pos.coords.latitude)  
            if (e==="none")
              {
                cb();
                return;
              }
            $.get('/audio-features?track='+e+ '&token=' + _token, function(data) {
              // "Data" is the object we get from the API. See server.js for the function that returns it.
              console.log("start get")
              //var upload = '{"Lat": " + +","Lng": 125920}';
              var upload = {"Lat":pos.coords.latitude, "Lng":pos.coords.longitude, "features":data};
              var upload_s = JSON.stringify(upload)
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;

              xhr.addEventListener("readystatechange", function () {
                
                
                if (this.readyState === 4) {
                  console.log(this.responseText);
                }
              });

              xhr.open("POST", "https://junction-de01.restdb.io/rest/inspire");
              //xhr.setRequestHeader("Origin", "enormous-liver.glitch.me/");
              xhr.setRequestHeader("content-type", "application/json");
              xhr.setRequestHeader("x-apikey", "5a1a69f89c8d4dd23ab1784d");
              xhr.setRequestHeader("cache-control", "no-cache");
      console.log("start xhr send")
              xhr.send(upload_s);
              
              cb();
              
            });
              
              
              
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
  
  
  
}



function get_song(e, cb){
   var send_data =null
  console.log("enter get_ song")
  if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos){
              //pos.coords.latitude,pos.coords.longitude
            console.log("lst="+pos.coords.latitude)  
              
           
              // var upload = {"Lat":pos.coords.latitude, "Lng":pos.coords.longitude, "features":data};
              // var upload_s = JSON.stringify(upload)
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;

              xhr.addEventListener("readytatechange", function (e) {
                
                console.log("return listener:" + this.readyState)
                if (this.readyState === 4) {
                  console.log(this);
                  //console.log(responseJSON)
                  cb(this.responseJSON);
                }

              });

              xhr.open("GET", "https://junction-de01.restdb.io/rest/fake-for-demo");
              //xhr.setRequestHeader("Origin", "enormous-liver.glitch.me/");
              xhr.setRequestHeader("content-type", "application/json");
              xhr.setRequestHeader("x-apikey", "5a1a69f89c8d4dd23ab1784d");
              xhr.setRequestHeader("cache-control", "no-cache");
           
              xhr.send(send_data);
              
              
              
              
              
          
              
              
              
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
  
  
  
}


