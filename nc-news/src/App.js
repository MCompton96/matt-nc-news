import React from 'react';
import './App.css';
import Articles from './components/Articles';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { Router } from '@reach/router';
import ArticlesByID from './components/ArticlesByID';
import ErrorHandle from './components/Errors';


class App extends React.Component {
  
  state = {
    newTopic: false
  }

  addANewTopicToNavBar = () => {
    this.setState(currentState => {
      return { newTopic: !currentState.newTopic}
    })
  }
  
  render() {
    const { newTopic } = this.state;
  
    return (
      <div className="App">
        <Header />
        <NavBar newTopic={newTopic}/>
        <Router primary={false}>
        <Articles path='/'addANewTopicToNavBar={this.addANewTopicToNavBar}/>
        <Articles path='/topics/:topic' addANewTopicToNavBar={this.addANewTopicToNavBar}/>
        <Articles path='/author/articles' addANewTopicToNavBar={this.addANewTopicToNavBar}/>
        <ArticlesByID path="/articles/:article_id"/>
        <ErrorHandle msg={'Page not found'} status={404} default/>
        </Router>
      </div>
    );
  }
}

export default App;
