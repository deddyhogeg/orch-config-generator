import React, { Component } from 'react';
import './App.scss';
import classNames from 'classnames';
import { Button, Input } from './sisense-styleguide-react/'
import {OrchConfiguration} from './OrchConfiguration'



class App extends Component {
  render() {
    return (
      <div className="App">
        <OrchConfiguration />
      </div>
    );
  }
}

export default App;
