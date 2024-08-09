import { Component } from "react";
import React from 'react';
import Popular from "./Components/Popular";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimeItem from "./Components/AnimeItem";
import HomePage from "./Components/HomePage";


function App(){

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/anime/:id" element={<AnimeItem />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;


