import React from 'react'

import { Route, Routes } from 'react-router-dom'

// Pages
import { Home } from '../pages/Home/Home'
import { Artists } from '../pages/Artists/Artists'
import { Settings } from '../pages/Settings/Settings'


export const ContentRoutes = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/artist" element={<Artists /> } />
            <Route path="/settings" exact element={<Settings />} />
        </Routes>
    )
}
