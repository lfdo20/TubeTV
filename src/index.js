import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import YTPlayer from 'yt-player';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'

import { Search } from './components/search';
// import dotenv from 'dotenv';

// dotenv.load();
// document.getElementById('playlist').style.display = 'inline-block';
// document.getElementById('playlist').onclick = createPlaylist;

function createPlaylist() {
  var request = gapi.client.youtube.playlists.insert({
    part: 'snippet,status',
    resource: {
      snippet: {
        title: 'LFDO Playlist',
        description: 'A public playlist created with the YouTube API'
      },
      status: {
        privacyStatus: 'public'
      }
    }
  });
  request.execute(function (response) {
    var result = response.result;
    if (result) {
      console.log(result);

      // playlistId = result.id;
      // $('#playlist-id').val(playlistId);
      $('#playlist-title').html(result.snippet.title);
      $('#playlist-description').html(result.snippet.description);
      $('#status').html('Finalmente Criou');
    } else {
      console.log('error');
      $('#status').html('Could not create playlist');
    }
  });

}

function getPlaylists() {
  var request = gapi.client.youtube.playlists.list({
    part: 'snippet,contentDetails',
    mine: 'true'
    }
  );
  request.execute(function (response) {
    var result = response.result;
  });
}

function getPlaylistItems(id) {
  var request = gapi.client.youtube.playlists.list({
    part: 'contentDetails',
    id: id
  }
  );
  request.execute(function (response) {
    var result = response.result;
  });
}

function addPlaylistItem(id, videoId) {
  var request = gapi.client.youtube.playlistItems.insert({
    part: 'snippet',
    resource: {
      "snippet": {
        "playlistId": "PLAYLIST_ID",
        "resourceId": {
          "kind": "youtube#video",
          "videoId": "VIDEO_ID"
        }
      }
    }
  });
  request.execute(function (response) {
    var result = response.result;
  });
}

function delPlaylistItem(playlistVideoId) {
  var request = gapi.client.youtube.playlistItems.delete({
    id: 'playlistVideoId',
  });
  request.execute(function (response) {
    var result = response.result;
  });
}






injectGlobal`
body {
  margin: 0;
}
  #container {
    background-color: rgba(0, 0, 0, 0.95);
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
`;

const Iframe = styled.iframe`
width: 1800px;
height: 940px;
border: 0px;
margin: 0 auto;
`;

const Player = styled.div`
  display: flex;
  align-self: center;
  margin: 0 auto;
  z-index: 2;
`;

const OverlayStyled = styled.div`
  position: absolute;
  margin: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 8;
`;

const PlaylistStyled = styled.div`
  width: 80px;
  height: 80px;
  background-color: rgba( 255,255,255,0.8);
  bottom: -40px;
  margin: 0 auto;
  border-radius: 40px;
  left: 50%;
  text-align: center;
  transform: translateX(-40px);
  position: absolute;
  z-index: 10;
  pointer-events: auto;
  &:hover {
		background-color: yellow;
	}
`;

const Playlist = () => {
  return (
    <PlaylistStyled>
      <h4> Click </h4>
    </PlaylistStyled>
  );
}

const Overlay = () => {
  return (
    <OverlayStyled>
      <Search />
      <Playlist />
    </OverlayStyled>
  );
}

let player;
class App extends Component {
  constructor (props) {
    super(props);
  }

  loadVideo(params) {
    player.load('3hKcMl2TC3M');
    player.on('ended', () => {
      this.loadVideo();
    });
  }

  componentDidMount() {
    const embedUrl = `https://youtube.com/embed/videoseries?list=PLXVoxTvPGOgfVi7Ja1hhL6U-ubc3ZuOTJ&autoplay=0&rel=0`;
    const playerOptions = {
      width: 1800,
      height: 940,
      autoplay: false, // change to true
      controls: true,
      keyboard: true,
      fullscreen: true,
      annotations: true,
      modestBranding: true,
      related: false,
      info: true,
      timeupdateFrequency: 1000
    };
    player = new YTPlayer('.ytplayer', playerOptions);
    player.setVolume(40);
    this.loadVideo();
    // player.on('playing', () => {
    //   console.log(player.getDuration()) // => 351.521
    // });
  }


  render () {
    return [
      <Player key='main' className='ytplayer'>
        {/* <Iframe
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
          frameborder="0"
          modestBranding="1"
          showinfo="0"
          src={embedUrl}>
        </Iframe> */}
      </Player>,
      <Overlay key='overlay'/>
    ];
  }
};



const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>
  , document.getElementById('container'));

module.hot.accept();
