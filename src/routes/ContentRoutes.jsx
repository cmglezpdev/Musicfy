import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Artists, Artist, Settings, Albums, Album } from '../pages'


export const ContentRoutes = () => {

    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/artists" element={<Artists /> } />
            <Route path="/artist/:id" element={<Artist /> } />
            <Route path="/albums" element={<Albums /> } />
            <Route path="/album/:id" element={<Album /> } />
            <Route path ="/settings" exact element={<Settings />} />
        </Routes>
    )
}
