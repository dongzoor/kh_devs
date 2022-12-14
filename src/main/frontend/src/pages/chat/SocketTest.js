import { setUserId } from "firebase/analytics";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import StudyApi from "../../lib/api/StudyApi";

const SocketTest = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const webSocketUrl = `ws://localhost:8211/ws/chat`;
  const roomId = window.localStorage.getItem("chatRoomId"); //룸 번호 얻는 코드
  const sender = sessionStorage.getItem("userNickname");
  let ws = useRef(null);
  const [items, setItems] = useState([]);

  const params = useParams().studyId;
  const [studyWriter, setStudyWriter] = useState("");

  const onChangMsg = (e) => {
    setInputMsg(e.target.value)
  }


  const onEnterKey = (e) => {
    if (e.key === 'Enter') onClickMsgSend(e);
  }

  const onClickMsgSend = (e) => {
    e.preventDefault();
    ws.current.send(
      JSON.stringify({
        "type": "TALK",
        "roomId": roomId,
        "sender": sender,
        "message": inputMsg
      }));
    setInputMsg("");
  }
  const onClickMsgClose = () => {
    ws.current.send(
      JSON.stringify({
        "type": "CLOSE",
        "roomId": roomId,
        "sender": sender,
        "message": "종료 합니다."
      }));
    ws.current.close();
  }

  useEffect(() => {

    const getStudyWriter = async () => {
      try {
        const response = await StudyApi.studyDetail(parseInt(params));
        setStudyWriter(response.data.writer);
      } catch {
        console.log("error");
      }

    }

    console.log("방번호 : " + roomId);
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log("connected to " + webSocketUrl);
        setSocketConnected(true);
      };
    }

    if (socketConnected) {
      if (studyWriter === sender) {
        ws.current.send(
          JSON.stringify({
            "type": "ENTER",
            "roomId": roomId,
            "sender": studyWriter,
            "message": "처음으로 접속 합니다."
          }));

      } else {
        ws.current.send(
          JSON.stringify({
            "type": "ENTER",
            "roomId": roomId,
            "sender": sender,
            "message": "처음으로 접속 합니다."
          }));
      }
    }
    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log(data.message);
      // setRcvMsg(data.message); //필요없는부분
      setItems((prevItems) => [...prevItems, data]);
    };
    getStudyWriter();
  }, [socketConnected]);




  return (
    <div >
      <div>socket</div>
      <div>socket connected : {`${socketConnected}`}</div>
      <div>방번호: {roomId}</div>
      <h2>소켓으로 문자 전송하기 테스트</h2>
      <div>
        {items.map((item) => {
          return <div>{`${item.sender} > ${item.message}`}</div>;
        })}
      </div>
      <input className="msg_input" placeholder="문자 전송" value={inputMsg} onChange={onChangMsg} onKeyPress={onEnterKey} />
      <button className="msg_send" onClick={onClickMsgSend}>전송</button>
      <p />
      <button className="msg_close" onClick={onClickMsgClose}>채팅 종료 하기</button>
    </div>
  );
};

export default SocketTest;