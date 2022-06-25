import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import { ContentRoutes } from '../../routes/ContentRoutes';
import MenuLeft from '../../components/MenuLeft/MenuLeft';

import './LoggedLayout.scss';

export const LoggedLayout = ({ user }) => {
  return (
    <BrowserRouter>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
        
          <Grid.Column className="content" width={13}>
            <h2>Top Bar</h2>
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
