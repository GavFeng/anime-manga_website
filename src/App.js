import { Component } from "react";
import React from 'react';
import Popular from "./Components/PopularAnime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimeItem from "./Components/AnimeItem";
import HomePage from "./Components/HomePage";
import MangaPage from "./Components/MangaPage";
import MangaItem from "./Components/MangaItem";



function App(){

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/manga_home" element={<MangaPage />} />
                <Route path="/manga_home/manga/:id" element={<MangaItem />} />
                <Route path="/anime/:id" element={<AnimeItem />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


