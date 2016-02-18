import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import { primaryColor,primaryColorText,primaryColorLight,accentColor,primaryColorDark } from './colors';
import {baseUrl} from './Const';
import RaisedButton from 'material-ui/lib/raised-button';
import axios from 'axios';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  send() {
    const sendApi = baseUrl + 'send';

    const sendUrl = this.refs.sendUrl.getValue();
    const from_email = this.refs.fromEmail.getValue();
    const to_email = this.refs.toEmail.getValue();

    console.log(sendUrl);

    axios.post(sendApi, {
        url: sendUrl,
        from_email: from_email,
        to_email: to_email,
      })
      .then((res) => {
        console.log(res);
      });
  }

  preview() {

    const sendApi = baseUrl + 'preview';
    const sendUrl = this.refs.sendUrl.getValue();

    axios.post(sendApi, {
        url: sendUrl,
      })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <TextField style={styles.input}
                   underlineFocusStyle={styles.underlineStyle}
                   ref="sendUrl"
                   floatingLabelText="请输入要推送的网址"
        />

        <div style={styles.buttonGroup}>
          <RaisedButton label="发送" backgroundColor={primaryColor} labelColor={primaryColorText}
                        onClick={this.send.bind(this)}
                        style={styles.button}/>

          <RaisedButton label="预览" backgroundColor={primaryColorLight} labelColor={primaryColorText}
                        onClick={this.preview.bind(this)}
                        style={styles.button}/>

          <RaisedButton label="附件" backgroundColor={primaryColorLight} labelColor={primaryColorText}
                        style={styles.button}>
            <input type="file" style={styles.exampleImageInput}/>
          </RaisedButton>
        </div>

        <TextField style={styles.input}
                   ref="fromEmail"
                   underlineFocusStyle={styles.underlineStyle}
                   floatingLabelText="请输入信任的邮箱"
        />
        <TextField style={styles.input}
                   ref="toEmail"
                   underlineFocusStyle={styles.underlineStyle}
                   floatingLabelText="请输入Kindle接收邮箱"
        />
      </div>
    );
  }
}

var styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '2%',

  },
  input: {
    width: '39%',
    alignSelf: 'center',
  },
  underlineStyle: {
    borderColor: primaryColor,
  },

  buttonGroup: {
    display: 'flex',
    width: '39%',
    alignSelf: 'center',
    marginTop: '3vh',
    marginBottom: '10vh',
  },

  button: {
    textAlign: 'center',
    marginRight: '2%',
    width: '35%',
    height: '5vh',
  },
  labelStyle: {
    fontSize: '18px',
    fontWeight: 'bold'
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export default Main;