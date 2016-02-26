import React, { Component } from 'react';
import { primaryColor,secondaryTextColor } from './colors';
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

  _contribute() {
    window.open("http://weibo.com/ttarticle/p/show?id=2309403946927568873479");
  }

  render() {
    return (
      <LeftNav style={styles.container} open={this.state.open} docked={false}
               onRequestChange={open => this.setState({open})}>
        <div style={styles.label}>Kindle助手</div>
        <MenuItem style={styles.item} onTouchTap={this._weibo}>
          微博</MenuItem>
        <MenuItem onTouchTap={this._help}>使用帮助</MenuItem>
        <MenuItem onTouchTap={this._contribute}>打赏支持</MenuItem>
        <div style={styles.spaceDiv}></div>
        <a style={styles.beian} href="http://www.miitbeian.gov.cn/">京ICP备15040267号-1</a>
      </LeftNav>
    )
  }
}


var styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
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
  spaceDiv: {
    flexGrow: 1,
  },
  beian: {
    textDecoration: 'none',
    fontSize: '12px',
    color: secondaryTextColor,
    textAlign: 'center',
  }
};

export default AppNav;