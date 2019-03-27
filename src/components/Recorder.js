import React from "react";
import AutographaStore from "./AutographaStore";
import { FormattedMessage } from "react-intl";
import { ReactMicPlus } from "react-mic-plus";
const Modal = require("react-bootstrap/lib/Modal");
import { observer } from "mobx-react";
import RaisedButton from "material-ui/RaisedButton";
import AudioPlayer from "react-h5-audio-player";
const db = require(`${__dirname}/../util/data-provider`).targetDb();
const constants = require("../util/constants");
let saveRec = require("../util/Rec_save_exp");

// import Fab from '@material-ui/core/Fab';
// import Icon from '@material-ui/core/Icon';

// import {version} from "../../package.json";
var audio,
  file,
  savedfile = [];

@observer
class RecorderModal extends React.Component {
  state = {
    record: false
  };

  startRecording = () => {
    this.setState({
      record: true
    });
  };

  stopRecording = () => {
    this.setState({
      record: false
    });
  };

  onStop = recordedBlob => {
    console.log("recordedBlob is: ", recordedBlob);
    audio = new Audio(recordedBlob.blobURL);
    file = recordedBlob;
    console.log(audio);
  };
  closeRecorder = () => {
    AutographaStore.showModalRecorder = false;
  };
  playrecorder = () => {
    audio.play();
  };

  saveRecorder = async e => {
    let book = {};
    const currentTrans = AutographaStore.currentTrans;
    let filesave;
    savedfile.push(file);
    console.log(savedfile);
    let doc = await db.get("targetBible");
    doc = doc.targetPath;
    book.bookNumber = AutographaStore.bookId.toString();
    book.bookName = constants.booksList[parseInt(book.bookNumber, 10) - 1];
    filesave = await saveRec.recSave(book, file, doc);
    AutographaStore.showModalRecorder = false;
    swal({
      title: currentTrans["tooltip-save-recordedfile"],
      text: `${currentTrans["label-save-webm"]} : ${filesave}`
    });
  };

  render() {
    return (
      <Modal
        show={AutographaStore.showModalRecorder}
        onHide={this.closeRecorder}
        className="RecTab"
        id="tab-record"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="tooltip-recorder" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ReactMicPlus
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
              strokeColor="#000000"
              backgroundColor="#0069D6"
              nonstop={true}
            />
            <RaisedButton
              buttonStyle={{ borderRadius: 25 }}
              style={{ borderRadius: 25, marginLeft: "30px" }}
              onClick={this.startRecording}
            >
              <i className="fa fa-microphone" />
            </RaisedButton>
            <RaisedButton
              buttonStyle={{ borderRadius: 25 }}
              style={{ borderRadius: 25 }}
              backgroundColor={"white"}
              onClick={this.stopRecording}
            >
              <i className="fa fa-stop" />
            </RaisedButton>
            <RaisedButton
              buttonStyle={{ borderRadius: 25 }}
              style={{ borderRadius: 25 }}
              backgroundColor={"white"}
              onClick={this.saveRecorder}
            >
              <i className="fa fa-floppy-o" />
            </RaisedButton>
            <RaisedButton
              buttonStyle={{ borderRadius: 25 }}
              style={{ borderRadius: 25 }}
              backgroundColor={"white"}
              onClick={this.playrecorder}
            >
              <i className="fa fa-play-circle" />
            </RaisedButton>
          </div>
          <div>
            {savedfile.map((file, key) => (
              <span
                id={key}
                key={key}
                style={{
                  width: "332px",
                  textAlign: "center",
                  display: "inline-block"
                }}
              >
                {file.blobURL}
                <AudioPlayer
                src={file.blobURL}
                onPlay={e => console.log("onPlay")}
                ></AudioPlayer>
              </span>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default RecorderModal;
