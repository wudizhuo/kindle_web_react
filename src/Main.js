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
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import Email from './Email';

//TODO 修复上传文件类型 不允许的bug

let send_url_error_text = "";
let snackbar_msg = "";

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showProgressBar: false,
      showSnackbar: false,
      showPreviewDialog: false,
      preview: {
        content: "",
      },
      filePath: "",
      error_from_email: "",
      error_to_email: "",
    };

  }

  render() {
    return (
      <div style={styles.container}>
        <TextField style={styles.input}
                   underlineFocusStyle={styles.underlineStyle}
                   ref="sendUrl"
                   errorText={send_url_error_text}
                   floatingLabelText="请输入要推送的网址"
                   onChange={this.sendTextOnChange.bind(this)}
                   multiLine={true}
        />
        <div style={styles.buttonGroup} className="main_button_group">
          {this._sendBtn()}

          <div style={styles.main_child_button_group}>
            {this._showPreviewDialog()}
            <RaisedButton label="预览" backgroundColor={primaryColorLight} labelColor={primaryColorText}
                          onClick={this.preview.bind(this)}
                          style={styles.button}/>
            <RaisedButton label="附件" backgroundColor={primaryColorLight} labelColor={primaryColorText}
                          style={styles.button}>
              <input ref="file" type="file" style={styles.fileInput} onChange={this.chooseFile.bind(this)}/>
            </RaisedButton>
          </div>
        </div>

        {this._progressBar()}

        <Email
          ref="email"
          error_from_email={this.state.error_from_email}
          error_to_email={this.state.error_to_email}
        />

        <Snackbar
          open={this.state.showSnackbar}
          onRequestClose={this._onRequestClose.bind(this)}
          message={snackbar_msg}
          autoHideDuration={3000}
        />
      </div>
    );
  }

  sendTextOnChange(event) {
    if (isEmpty(this.refs.sendUrl.getValue())) {
      this.setState({filePath: ""});
      return;
    }
  }

  chooseFile(event) {
    var filePath = event.target.files[0].name;
    if (isEmpty(filePath)) {
      return;
    }
    this.setState({filePath: filePath});
    this.refs.sendUrl.setValue(filePath);
  }

  _sendBtn() {
    if (isEmpty(this.state.filePath)) {
      return (
        <RaisedButton label="发送" backgroundColor={primaryColor} labelColor={primaryColorText}
                      onClick={this.send.bind(this)}
                      style={styles.button}/>
      );
    } else {
      return (
        <RaisedButton label="发送附件" backgroundColor={primaryColor} labelColor={primaryColorText}
                      onClick={this.attach.bind(this)}
                      style={styles.button}/>
      );
    }
  }

  send() {
    const sendApi = baseUrl + 'send';

    let sendUrl = this.refs.sendUrl.getValue();

    if (isEmpty(sendUrl)) {
      send_url_error_text = "请输入要推送的网址";
      this.forceUpdate();
      return;
    }

    let from_email = this.refs.email.getFromMail();
    let to_email = this.refs.email.getToMail();

    if (this.state.showProgressBar) {
      snackbar_msg = "发送中....";
      this.forceUpdate();
      return;
    }

    this._resetWarning();

    axios.post(sendApi, {
        url: sendUrl,
        from_email: from_email,
        to_email: to_email,
      })
      .then((res) => {
        snackbar_msg = "已发送";
        this.setState({showSnackbar: true});
        this.setState({showProgressBar: false});

        this.forceUpdate();
      })
      .catch((res) => {
        this.setState({showProgressBar: false});
        switch (res.data.code) {
          case ERROR_CODE_FROM_EMAIL:
            this.setState({error_from_email: res.data.error});
            break;
          case ERROR_CODE_TO_EMAIL:
            this.setState({error_to_email: res.data.error});
            break;
          case ERROR_CODE_INVALID_URL:
            send_url_error_text = res.data.error;
            break;
          default:
            snackbar_msg = res.data.message;
            this.setState({showSnackbar: true});
            break;
        }
        this.forceUpdate();
      });
  }

  _resetWarning() {
    this.setState({showProgressBar: true});
    this.setState({error_from_email: ""});
    this.setState({error_to_email: ""});
    send_url_error_text = ""
  }

  preview() {
    const sendApi = baseUrl + 'preview';
    const sendUrl = this.refs.sendUrl.getValue();

    if (isEmpty(sendUrl)) {
      send_url_error_text = "请输入要预览的网址";
      this.forceUpdate();
      return;
    }

    if (this.state.showProgressBar) {
      snackbar_msg = "发送中....";
      this.forceUpdate();
      return;
    }

    this._resetWarning();

    axios.post(sendApi, {
        url: sendUrl,
      })
      .then((res) => {
        this.setState({showPreviewDialog: true});
        this.setState({showProgressBar: false});
        this.setState({
          preview: {
            content: res.data.content,
          }
        });
      })
      .catch((res) => {
        this.setState({showProgressBar: false});
        switch (res.data.code) {
          case ERROR_CODE_INVALID_URL:
            send_url_error_text = res.data.message;
            break;
          default:
            snackbar_msg = res.data.message;
            this.setState({showSnackbar: true});
            break;
        }
        this.forceUpdate();
      });
  }


  attach() {
    let api = baseUrl + 'upload';

    let sendUrl = this.refs.sendUrl.getValue();

    if (isEmpty(sendUrl)) {
      send_url_error_text = "请选择要发送的附件";
      this.forceUpdate();
      return;
    }

    this._resetWarning();

    if (this.state.showProgressBar) {
      snackbar_msg = "发送中....";
      this.forceUpdate();
      return;
    }

    let fileData = new FormData();
    let from_email = this.refs.email.getFromMail();
    let to_email = this.refs.email.getToMail();

    fileData.append("to_email", to_email);
    fileData.append("from_email", from_email);

    fileData.append('file', this.refs.file.files[0]);
    axios.post(api, fileData)
      .then((res) => {
        snackbar_msg = "已发送";
        this.setState({showSnackbar: true});
        this.setState({showProgressBar: false});

        this.forceUpdate();
      })
      .catch((res) => {
        this.setState({showProgressBar: false});
        switch (res.data.code) {
          case ERROR_CODE_FROM_EMAIL:
            this.setState({error_from_email: res.data.message});
            break;
          case ERROR_CODE_TO_EMAIL:
            this.setState({error_to_email: res.data.message});
            break;
          case ERROR_CODE_INVALID_URL:
            send_url_error_text = res.data.message;
            break;
          default:
            snackbar_msg = res.data.message;
            this.setState({showSnackbar: true});
            break;
        }
        this.forceUpdate();
      });
  }

  handleDialogClose() {
    this.setState({showPreviewDialog: false});
  };

  _showPreviewDialog() {
    const actions = [
      <FlatButton
        label="关闭"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogClose.bind(this)}
      />,
    ];

    const customContentStyle = {
      overflow: 'auto',
    };

    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.showPreviewDialog}
        bodyStyle={customContentStyle}
        onRequestClose={this.handleDialogClose.bind(this)}
      >
        <div
          style={styles.iframe}
          dangerouslySetInnerHTML={ {__html: this.state.preview.content} }/>
      </Dialog>
    );
  }

  showSnackbar() {
    snackbar_msg = "开发中的功能,暂不能用...";
    this.setState({showSnackbar: true});
  }

  _onRequestClose() {
    this.setState({showSnackbar: false});
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
    minWidth: '39%',
  },

  underlineStyle: {
    borderColor: primaryColor,
  },

  buttonGroup: {
    display: 'flex',
    minWidth: '39%',
    marginTop: '2vh',
  },

  button: {
    flexGrow: 1,
    textAlign: 'center',
    margin: '1vh',
  },

  main_child_button_group: {
    display: 'flex',
    flexGrow: 2,
    textAlign: 'center',
  },

  progress: {
    marginTop: '5vh',
  },

  labelStyle: {
    fontSize: '18px',
    fontWeight: 'bold'
  },

  iframe: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
  },

  fileInput: {
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