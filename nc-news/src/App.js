import React from 'react';
import './App.css';
import Articles from './components/Articles';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { Router } from '@reach/router';
import ArticlesByID from './components/ArticlesByID';

class App extends React.Component {
  
  state = {
    newTopic: false
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Router primary={false}>
        <Articles path='/'/>
        <Articles path='/topics/:topic'/>
        <Articles path='/author/articles'/>
        <ArticlesByID path="/articles/:article_id"/>
        </Router>
      </div>
    );
  }
}

export default App;