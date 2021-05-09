import React from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import Routes from "./Routes";

export const App: React.FC = () => {
    return <>
        <HashRouter>
            <Routes/>
        </HashRouter>
    </>
}
