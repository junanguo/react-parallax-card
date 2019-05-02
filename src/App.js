import React from 'react';
import logo from './logo.svg';
import './App.css';
import ParallaxCard from "./parallaxCard"
import styles from "./index.css"

function App() {
  return (
      <ParallaxCard title='Parallax Card' description='These cards you see in the project section is implemented in ReactJS. Move your mouse around on the card!' bgImg = {require('./bg1.png')}/>
  );
}

export default App;
