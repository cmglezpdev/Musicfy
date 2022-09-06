import React from 'react'

import { Route, Routes } from 'react-router-dom'

// Pages
import { Home } from '../pages/Home/Home'
import { Artists } from '../pages/Artists/Artists'
import { Settings } from '../pages/Settings/Settings'


export const ContentRoutes = ({ setReloadApp }) => {

    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/artists" element={<Artists /> } />
            <Route path="/settings" exact element={<Settings setReloadApp={setReloadApp} />} />
        </Routes>
    )
}
