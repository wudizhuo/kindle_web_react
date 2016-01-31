import React, { Component } from 'react';
import { primaryColor } from './colors';
import FlatButton from 'material-ui/lib/flat-button';
import AppBar from 'material-ui/lib/app-bar';

//todo add 微博 tab

class Header extends Component {

  render() {
    return (
      <div>
        <AppBar
          style={styles.label}
          title="Kindle助手"
          onTouchTap={this.props.onTouchTap}>
          <FlatButton style={styles.text} label="手机APP"/>
          <FlatButton style={styles.text} label="登陆"/>
        </AppBar>
      </div>
    );
  }
}

var styles = {
  label: {
    textOverflow: 'ellipsis',
    display: 'flex',
    color: '#ffffff',
    fontSize: '16px',
    flexShrink: 0,
    zIndex: 4,
    backgroundColor: primaryColor,
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
  },
  text: {
    color: '#ffffff',
    fontSize: '16px',
  },
};

export default Header;