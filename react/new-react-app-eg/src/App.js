import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Project} from './project.js'
import NavBar from './navBar.js'



const projectArray = [{ title: 'Zombie app', description: 'A zombie terminal game.', link: 'https://github.com/KitoC/coderAcademyAsssignment-1' }, { title: 'Portfolio app', description: 'I made an iphone... in a website...', link: 'http://kitoclark.me/' }, { title: 'Two-sided marketplace app', description: 'Share space baby. Where people collaborate.', link: 'https://github.com/KitoC/share-space' }, { title: 'React app', description: 'Ummmm.... dunno mate?', link: 'NA' }]

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1 style={{ color: 'red' }}>My portfolio!</h1>
        <p className="foo">Paragraph</p>
        
          <Project  arr={projectArray}/>
        

        
      </div>
    );
  }
}



export default App;
