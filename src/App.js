import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ViewSpeech from './components/ViewSpeech';
import CreateSpeech from './components/CreateSpeech';
import Header from './components/Header';


class App extends Component {
  render() {
    return(
      <Router>
        <Header />
        <Switch> 
                <Route exact path = "/" component = {CreateSpeech} />  
                <Route path = "/view" component = {ViewSpeech} />
        </Switch>
      </Router>
    ) 
  }
}

export default App;
