import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Artists, Artist, Settings } from '../pages'


export const ContentRoutes = () => {

    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/artists" element={<Artists /> } />
            <Route path="/artist/:id" element={<Artist /> } />
            <Route path ="/settings" exact element={<Settings />} />
        </Routes>
    )
}
