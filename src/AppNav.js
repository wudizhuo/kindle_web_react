import React, { Component } from 'react';
import { primaryColor } from './colors';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

class AppNav extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  _weibo() {
    window.open("http://weibo.com/wudizhuo");
  }

  _help() {
    window.open("http://sspai.com/28388");
  }

  render() {
    return (
      <div>
        <LeftNav open={this.state.open} docked={false} onRequestChange={open => this.setState({open})}>
          <div style={styles.label}>Kindle助手</div>
          <MenuItem style={styles.item} onTouchTap={this._weibo}>
            微博</MenuItem>
          <MenuItem onTouchTap={this._help}>使用帮助</MenuItem>
        </LeftNav>
      </div>
    )
  }
}


var styles = {
  label: {
    lineHeight: '64px',
    color: '#ffffff',
    backgroundColor: primaryColor,
    fontSize: '16px',
    paddingLeft: '16px',
  },
  item: {
    marginTop: '16px',
  },
};

export default AppNav;