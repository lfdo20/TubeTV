import React from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import YTPlayer from 'yt-player';
import axios from 'axios';
import { user, oauthToken } from './auth';
// import dotenv from 'dotenv';

// dotenv.load();
document.getElementById('playlist').style.display = 'inline-block';
document.getElementById('playlist').onclick = createPlaylist;

  function createPlaylist() {
    //var request = gapi.client.youtube.playlists.insert({
      const part = {
          snippet: {
            title: 'Funcionou PORRAAA',
            description: 'A private playlist created with the YouTube API'
          },
          status: {
            privacyStatus: 'private'
          }
        };

    const axOptions = {
      mode: 'no-cors',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: true,
      credentials: 'same-origin',
      crossDomain: true
    };


    const createPlaylistUrl = 'https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.playlists.insert?part=${part.snippet},${part.status}';
    axios.get(createPlaylistUrl)
      .then((res) => {
        console.log(res);

      })
      //});
    // request.execute(function (response) {
    //   var result = response.result;
    //   if (result) {
    //     playlistId = result.id;
    //     console.log('foi', playlistId);

    //     //$('#playlist-id').val(playlistId);
    //     //$('#playlist-title').html(result.snippet.title);
    //     //$('#playlist-description').html(result.snippet.description);
    //   } else {
    //     console.log('Não deu');

    //     //$('#status').html('Could not create playlist');
    //   }
    // });
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
`;

const OverlayStyled = styled.div`
  position: absolute;
  margin: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
`;

const PlaylistStyled = styled.div`
  width: 80px;
  height: 80px;
  background-color: rgba( 255,255,255,0.2);
  bottom: -40px;
  margin: 0 auto;
  border-radius: 40px;
  left: 50%;
  text-align: center;
  transform: translateX(-40px);
  position: absolute;
  z-index: 10;
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
      <Playlist />
    </OverlayStyled>
  );
}


const App = () => {
  const embedUrl = `https://youtube.com/embed/videoseries?list=PLXVoxTvPGOgfVi7Ja1hhL6U-ubc3ZuOTJ&autoplay=0&rel=0`;

  //   const player = new YTPlayer('#player')
  //  player.load('GKSRyLdjsPA')
  // player.setVolume(100)

  // player.on('playing', () => {
  //   console.log(player.getDuration()) // => 351.521
  // })
  return [
    <Player>
      <Iframe
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
        frameborder="0"
        modestBranding="1"
        showinfo="0"
        src={embedUrl}>
      </Iframe>
    </Player>,
    <Overlay />
  ];
};

ReactDOM.render(<App/>, document.getElementById('container'));

module.hot.accept();
