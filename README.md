Spotify Playground
=========================

Written by [Arielle Vaniderstine](https://twitter.com/imariari)

A basic Node app that integrates with the Spotify API.

This app uses the *Client Credentials Flow* for authentication, which means you can only get non-user-specific data.

-----

## Getting Started

1. After registering your app at developer.spotify.com, put your app's client ID and secret (which you can find in the Dashboard) into the `.env` file.

2. Click on "Show Live" in Glitch and verify that your app works (you should see data in each of the coloured sections).

-----

## Working with the Playground

- Navigate between files in Glitch's left panel.
- See server logs by clicking "Logs" at the top of the left panel.
- Open the browser's **Developer Tools** by right-clicking and selecting **Inspect**.
- Calls to the Spotify API live in **server.js**.
- Calls to your own server and the rendering of the UI occur in **public/client.js**.

-----

## Challenges

#### Pink: Search for a Track

1. Change the song that shows up. *(Hint: look in server.js for the API call)*

2. Display the artist name in addition to the song name. *(Hint: look at the whole track object to find the artist name)*

3. Make the title link to the song on Spotify. *(Hint: look at the whole track object to find the song URL)*

#### Purple: Get a Category's Playlists

1. Get the playlists for a different category! You can find other categories [here](https://beta.developer.spotify.com/console/get-browse-categories/)

2. Show 10 playlists instead of 5.

3. Different playlists are shown to users in different countries. Show the playlists from another country.

#### Orange: Get Audio Features for a Track

1. What track are these audio features for?

2. There are more audio features available. Display 2 more features.

3. Get the audio features for another track.

#### Blue: Get an Artist

1. Get another artist.

2. Show the popularity value for the artist.

3. Show the number of followers the artist has.

#### Yellow: Get an Artist's Top Tracks

1. Whose top tracks are these?

2. Get the top tracks of another artist.

3. Top Tracks vary by country. Which country are these top tracks for? Show the top tracks in another country.

### Bonus!

Use a different endpoint to get totally different data! *(Hint: look at [this repository](https://github.com/thelinmichael/spotify-web-api-node/) for examples of all the calls you can make)*

