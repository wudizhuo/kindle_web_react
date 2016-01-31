import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import AppNav from './AppNav';

class App extends Component {

  render() {
    return (
      <div className="app-wrap">
        <AppNav ref="leftNav" />
        <Header onTouchTap={this._onLeftIconButtonTouchTap.bind(this)}/>
        <Main />
      </div>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.handleToggle();
  }
}

export default App;