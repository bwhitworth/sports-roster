import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import fbConnection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import Team from '../components/Team/Team';
import NavBar from '../components/Navbar/Navbar';

import './App.scss';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    const loadComponent = () => {
      let componentToLoad = '';
      if (authed) {
        componentToLoad = <Team />;
      } else {
        componentToLoad = <Auth />;
      }
      return componentToLoad;
    };
    return (
      <div className="App">
        <NavBar authed={authed}/>
        <h2>Team Roster</h2>
        {loadComponent()}
      </div>
    );
  }
}

export default App;
