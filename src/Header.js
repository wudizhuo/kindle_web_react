import React, {Component} from 'react';
import {primaryColor} from './colors';
import FlatButton from 'material-ui/lib/flat-button';
import AppBar from 'material-ui/lib/app-bar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Apple_Store from '-!babel!svg-react!./assets/Apple_Store.svg';

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
          <IconMenu
            iconButtonElement={<FlatButton style={styles.text} label="手机APP"
            />}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}

          >
            <MenuItem>
              <a
                style={styles.iconMenu}
                target="_blank"
                href='https://play.google.com/store/apps/details?id=com.googleplay.kindleassistant&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                <img
                  style={{
                    width: '150px'
                  }}
                  alt='Get it on Google Play'
                  src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a></MenuItem>
            <MenuItem>
              <a
                style={styles.iconMenu}
                target="_blank"
                href='https://itunes.apple.com/cn/app/%E9%98%85%E8%AF%BB%E6%8E%A8%E9%80%81%E5%8A%A9%E6%89%8B/id1214767403?l=en&mt=8'>
                <Apple_Store
                  style={styles.iconMenu}/>
              </a></MenuItem>
            <MenuItem>
              <a
                style={styles.iconMenu}
                target="_blank"
                href='http://sj.qq.com/myapp/detail.htm?apkName=com.kindleassistant'>
                <img
                  alt='Get it on 应用宝'
                  src='http://img6.sj.qq.com/res/sj.qq.com/official2/images/common/logoyyb.png?20140110'/></a></MenuItem>
          </IconMenu>
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
  iconMenu: {
    display: 'flex',
    paddingTop: '10px',
    paddingBottom: '10px',
    width: '100%',
    height: '60px',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: '16px',
  },
};

export default Header;