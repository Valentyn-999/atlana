import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import Routes from "./Routes";
// import Header from "./Components/Header";

export const App:React.FC = () => {
  return <>
      <HashRouter >
        {/*<Header/>*/}
        <Routes/>
      </HashRouter>
    </>
}
