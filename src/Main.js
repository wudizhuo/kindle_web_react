import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import { primaryColor,primaryColorText,primaryColorLight,accentColor,primaryColorDark } from './colors';
import {baseUrl,ERROR_CODE_FROM_EMAIL,ERROR_CODE_TO_EMAIL,ERROR_CODE_INVALID_URL} from './Const';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/circular-progress';
import axios from 'axios';
import cookie from 'react-cookie';
import isEmpty from 'lodash/isEmpty';
import Snackbar from 'material-ui/lib/snackbar';

//todo 如果是未找到发送的内容 1分钟内再次点击会提示错误 应该修改server1分钟的查询语句
//todo 把preview等未实现的功能 ui处理下 变成不可点击

let from_email = "";
let to_email = "";
let error_from_email = "";
let error_to_email = "";
let send_url_error_text = "";
let snackbar_msg = "";

class Main extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isShowSaveBtn: false,
      showProgressBar: false,
      showSnackbar: false,
    };

    from_email = cookie.load('from_email');
    to_email = cookie.load('to_email');
  }

  send() {
    const sendApi = baseUrl + 'send';

    let sendUrl = this.refs.sendUrl.getValue();

    if (isEmpty(sendUrl)) {
      send_url_error_text = "请输入要推送的网址"
      this.forceUpdate();
      return;
    }

    if (this.state.showProgressBar) {
      snackbar_msg = "发送中...."
      this.forceUpdate();
      return;
    }

    error_from_email = ""
    error_to_email = ""
    send_url_error_text = ""

    this.state.showProgressBar = true;
    this.forceUpdate();

    axios.post(sendApi, {
        url: sendUrl,
        from_email: from_email,
        to_email: to_email,
      })
      .then((res) => {
        this.state.showSnackbar = true;
        this.state.showProgressBar = false;

        snackbar_msg = "已发送"
        this.forceUpdate();
      })
      .catch((res) => {
        this.state.showProgressBar = false;
        switch (res.data.code) {
          case ERROR_CODE_FROM_EMAIL:
            error_from_email = res.data.error;
            break;
          case ERROR_CODE_TO_EMAIL:
            error_to_email = res.data.error;
            break;
          case ERROR_CODE_INVALID_URL:
            send_url_error_text = res.data.error;
            break;
          default:
            snackbar_msg = res.data.error
            this.state.showSnackbar = true;
            break;
        }
        this.forceUpdate();
      });
  }

  preview() {
    this.showSnackbar();
    return;

    const sendApi = baseUrl + 'preview';
    const sendUrl = this.refs.sendUrl.getValue();

    axios.post(sendApi, {
        url: sendUrl,
      })
      .then((res) => {
        console.log(res);
      });
  }

  attach(){
    this.showSnackbar();
    return;
  }

  render() {
    return (
      <div style={styles.container}>
        <TextField style={styles.input}
                   underlineFocusStyle={styles.underlineStyle}
                   ref="sendUrl"
                   errorText={send_url_error_text}
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
                        onClick={this.attach.bind(this)}
                        style={styles.button}>
            <input type="file" style={styles.exampleImageInput}/>
          </RaisedButton>
        </div>

        {this._progressBar()}

        <TextField style={styles.fromEmail}
                   ref="fromEmail"
                   value={from_email}
                   onChange={this._emailChange.bind(this)}
                   underlineFocusStyle={styles.underlineStyle}
                   floatingLabelText="请输入信任的邮箱"
                   errorText={error_from_email}
        />
        <TextField style={styles.input}
                   ref="toEmail"
                   value={to_email}
                   errorText={error_to_email}
                   onChange={this._emailChange.bind(this)}
                   underlineFocusStyle={styles.underlineStyle}
                   floatingLabelText="请输入Kindle接收邮箱"
        />
        {this._saveButton()}
        <Snackbar
          open={this.state.showSnackbar}
          onRequestClose={this._onRequestClose}
          message={snackbar_msg}
          autoHideDuration={3000}
        />
      </div>
    );
  }

  showSnackbar(){
    snackbar_msg = "开发中的功能,暂不能用...";
    this.state.showSnackbar = true;
    this.forceUpdate();
  }

  _onRequestClose(){
    this.state.showSnackbar = false;
  }

  _progressBar() {
    if (this.state.showProgressBar) {
      return (
        <CircularProgress
          color={primaryColor}
          style={styles.progress}/>
      );
    }
  }

  _emailChange() {
    this.state.isShowSaveBtn = true;
    from_email = this.refs.fromEmail.getValue();
    to_email = this.refs.toEmail.getValue();
    this.forceUpdate();
  }

  _saveButton() {
    if (this.state.isShowSaveBtn) {
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
    this.state.isShowSaveBtn = false;
    cookie.save('from_email', this.refs.fromEmail.getValue());
    cookie.save('to_email', this.refs.toEmail.getValue());
    this.forceUpdate();
  }

}

var styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '2%',
    alignItems: 'center',
  },

  input: {
    width: '39%',
  },

  fromEmail: {
    width: '39%',
    marginTop: '15vh',
  },

  underlineStyle: {
    borderColor: primaryColor,
  },

  buttonGroup: {
    display: 'flex',
    width: '39%',
    marginTop: '2vh',
  },

  button: {
    textAlign: 'center',
    marginRight: '2%',
    width: '35%',
    height: '5vh',
  },

  progress: {
    marginTop: '5vh',
  },

  saveButton: {
    marginTop: '3vh',
    width: '15%',
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