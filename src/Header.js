import React, { Component } from 'react';
import { primaryColor } from './colors';
import FlatButton from 'material-ui/lib/flat-button';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bigScreen: false,
    };

  }

  componentWillMount() {
    let setBigScreen = function () {
      this.setState({bigScreen: document.body.clientWidth > 600});
    }.bind(this);
    setBigScreen();
    window.onresize = setBigScreen;
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
                      linkButton={true}
                      href='http://sj.qq.com/myapp/detail.htm?apkName=com.kindleassistant'
          />

          {this._login()}

        </AppBar>
      </div>
    );
  }

  _login() {
    if (this.state.bigScreen) {
      return (
        <FlatButton label="登陆"
                    style={styles.text}
                    onClick={this.props.onLogin}
        />
      );
    }
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
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: '16px',
  },
};

export default Header;