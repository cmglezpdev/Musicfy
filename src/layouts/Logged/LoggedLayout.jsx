import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import { ContentRoutes } from '../../routes';
import { MenuLeft, TopBar } from '../../components';

import './LoggedLayout.scss';

export const LoggedLayout = () => {
  return (
    <BrowserRouter>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft />
          </Grid.Column>
        
          <Grid.Column className="content" width={13}>
            <TopBar />
              <ContentRoutes />
          </Grid.Column>
        </Grid.Row>

        <Grid.Column width={16}>
          <h2>Player</h2>
        </Grid.Column>
      </Grid>
    </BrowserRouter>
  )
}
