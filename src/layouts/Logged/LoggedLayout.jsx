import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import { ContentRoutes } from '../../routes';
import { MenuLeft, TopBar, Player } from '../../components';

import './LoggedLayout.scss';

export const LoggedLayout = () => {

  const [songData, setSongData] = useState(null);

  const playerSong = ( albumImage, songName, songUrl ) => {
    setSongData({
      image: albumImage,
      name: songName,
      url: songUrl,
    }) 
  }

  // const aux = {
  //   image: "https://firebasestorage.googleapis.com/v0/b/musicfy-51048.appspot.com/o/albums%2F67c8f9f7-1baa-4569-9801-b9d507991fa1?alt=media&token=309a023d-4bd9-4a34-a3b7-9a23fb645662",
  //   name: "Efecto vocales",
  //   url: "https://firebasestorage.googleapis.com/v0/b/musicfy-51048.appspot.com/o/songs%2F7e6620ab6b3f18c74ed1c1f7c05bb3c5.mp3?alt=media&token=272e2c48-34c9-4623-af2f-a91f6126b085"
  // }

  return (
    <BrowserRouter>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft />
          </Grid.Column>

          <Grid.Column className="content" width={13}>
            <TopBar />
            {/* <button onClick={() => playerSong(aux.image, aux.name, aux.url)}>START</button> */}
            <ContentRoutes />
          </Grid.Column>
        </Grid.Row>

        <Grid.Column width={16}>
          <Player songData={songData} />
        </Grid.Column>
      </Grid>
    </BrowserRouter>
  )
}
