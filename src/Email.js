import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import { primaryColor,primaryColorText,primaryColorLight,accentColor,primaryColorDark } from './colors';
import cookie from 'react-cookie';

let from_email = "";
let to_email = "";

class Email extends Component {

  constructor(props) {
    super(props);

    this.state = {
      is_show_save_btn: false,
    }

    from_email = cookie.load('from_email');
    to_email = cookie.load('to_email');
  }

  render() {
    return (
      <div style={styles.container}>
        <TextField style={styles.fromEmail}
                   ref="fromEmail"
                   value={from_email}
                   onChange={this._emailChange.bind(this)}
                   underlineFocusStyle={styles.underlineStyle}
                   floatingLabelText="请输入信任的邮箱"
                   errorText={this.props.error_from_email}
        />
        <TextField style={styles.toEmail}
                   ref="toEmail"
                   value={to_email}
                   errorText={this.props.error_to_email}
                   onChange={this._emailChange.bind(this)}
                   underlineFocusStyle={styles.underlineStyle}
                   floatingLabelText="请输入Kindle接收邮箱"
        />
        {this._saveButton()}
      </div>
    );
  }

  _emailChange() {
    from_email = this.refs.fromEmail.getValue();
    to_email = this.refs.toEmail.getValue();
    this.setState({is_show_save_btn: true});
  }

  _saveButton() {
    if (this.state.is_show_save_btn) {
      return (
        <RaisedButton
          label="保存" backgroundColor={accentColor} labelColor={primaryColorText}
          onClick={this._saveEmail.bind(this)}
          style={styles.saveButton}
        />
      );
    }
  }

  _saveEmail() {
    cookie.save('from_email', this.refs.fromEmail.getValue());
    cookie.save('to_email', this.refs.toEmail.getValue());
    this.setState({is_show_save_btn: false});
  }

  getFromMail(){
    return this.refs.fromEmail.getValue();
  }

  getToMail(){
    return this.refs.toEmail.getValue();
  }

}

var styles = {
  container: {
    display: 'flex',
    minWidth: '39%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },

  saveButton: {
    marginTop: '3vh',
    width: '15%',
  },

  fromEmail: {
    width: '100%',
    marginTop: '15vh',
  },

  toEmail: {
    width: '100%',
  },

};

export default Email;