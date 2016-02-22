import React, { Component } from 'react';
import { primaryColor } from './colors';
import FlatButton from 'material-ui/lib/flat-button';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';

class Header extends Component {

  _app() {
    window.open("http://sj.qq.com/myapp/detail.htm?apkName=com.kindleassistant");
  }

  render() {
    return (
      <div
        style={styles.header}
      >
        <AppBar
          style={styles.label}
          title="Kindle助手"
          onLeftIconButtonTouchTap={this.props.onTouchTap}
          onTitleTouchTap={this.props.onTouchTap}>
          <FlatButton style={styles.text} label="手机APP"
                      onClick={this._app.bind(this)}
          />

          <FlatButton label="登陆"
                      style={styles.text}
                      onClick={this.props.onLogin}
          />
        </AppBar>
      </div>
    );
  }

}

var styles = {
  header: {
    backgroundColor: primaryColor,
    display: 'flex',
  },
  label: {
    textOverflow: 'ellipsis',
    backgroundColor: primaryColor,
    display: 'flex',
    color: '#ffffff',
    fontSize: '16px',
    flexShrink: 0,
    zIndex: 4,
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
  },
  text: {
    color: '#ffffff',
    fontSize: '16px',
  },
};

export default Header;