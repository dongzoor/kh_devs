import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid"
import { ref, uploadString, getDownloadURL, deleteObject } from "@firebase/storage";
import { storageService } from "../../lib/api/fbase";
import StudyApi from "../../lib/api/StudyApi";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Addr from "./Addr";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";



const Box = styled.div`
  margin: 0;
  padding: 0;
  font-family: Raleway, Pretendard Std;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
  
  .hashtag-container {
  height: 2vh;
  margin: -0.8vh 0.2vh 1vh 0;
  }

  .hashtag-badge {
    margin-right: 0.5vw; 
  }

  .inputContainer {
    width: 60vw;
    height: 115vh;
    margin: 0 auto;
    padding: 15px;
    background-color: #FFF;
    box-shadow: 0px 0px 24px #5c5696;
    border-radius: 25px;
  }

  .option-container {
    display: flex;
  }

  .form-select {
    width: 7vw;
    margin-bottom: 2vh;
  }

  .addr-container {
    margin-left: 5vw;
  }
  .addr-label {
    margin-bottom: 0.6vh;
  }

  .calendar-container {
    margin-left: 5vw;
  }
  .calendar-label {
    margin-bottom: 0.6vh;
  }

  .btn-submit {
    float: right;
  }
`;

const StudyWrite = (studyObj) => {
  const [attachment, setAttachment] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [valueDate, setValueDate] = useState(new Date());
  const [people, setPeople] = useState(""); // 모집 인원
  const [addr, setAddr] = useState("");
  const [applyPeople, setApplyPeople] = useState([]); //지원자 목록

  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  let attachmentUrl = "";
  //사진 첨부 없이 텍스트만 트윗하고 싶을 때도 있으므로 기본 값을 ""로 해야한다.
  //트윗할 때 텍스트만 입력시 이미지 url ""로 비워두기 위함

  const titleChange = (e) => {
    const {
      target: { value }
    } = e;
    setTitle(value);
  };

  const contentChange = (e) => {
    const {
      target: { value }
    } = e;
    setContent(value);
  };

  const imgChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    console.log(theFile);

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onSubmit = async (e) => {

    e.preventDefault();


    //이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 attachment가 있을때만 아래 코드 실행
    //이미지 첨부하지 않은 경우엔 attachmentUrl=""이 된다.
    if (attachment !== "") {
      //파일 경로 참조 만들기
      const attachmentRef = ref(storageService, `/STUDY/${uuidv4()}`); //const fileRef = ref(storageService, `${ studyObj.studyId } / ${ uuidv4() }`);
      //storage 참조 경로로 파일 업로드 하기                                            위의 거로 바꿔주어야 스터디 아이디에 맞게 저장됨
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
      attachmentUrl = await getDownloadURL(response.ref);
      console.log(attachmentUrl);
    }



    const studyReg = await StudyApi.studyWrite(
      userId,
      title,
      content,
      attachmentUrl,
      hashtags,
      people,
      addr,
      valueDate,
      applyPeople
    );

    console.log(studyReg);

    console.log(studyReg.statusText);
    if (studyReg.statusText === "OK")
      window.confirm("스터디 모집이 시작되었습니다.");
    navigate("/studies");
  };

  // const onDelete = async () => {
  //   const urlRef = ref(storageService, attachmentUrl);
  //   try {
  //     if (attachmentUrl !== "") {
  //       await deleteObject(urlRef);
  //     }
  //   } catch (error) {
  //     window.alert("이미지를 삭제하는 데 실패했습니다!");
  //   }
  // };

  const onChangeHashtag = (e) => {
    const {
      target: { value }
    } = e;
    setHashtag(value);
  }

  const addHashtag = (e) => {
    setHashtags([...hashtags, hashtag]);
    setHashtag('');
  }

  const onDeleteHash = (e) => {
    const {
      target: target
    } = e;

    hashtags.pop(target.innerHTML);
    console.log(hashtags);
    target.innerHTML = "";
  }

  const getAddr = (e) => {
    setAddr(e);
    console.log(addr + " " + valueDate + " " + people);
  }

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     setHashtags([...hashtags, hashtag]);
  //     setHashtag('');
  //   }
  // }

  return (
    <Box>
      <div className="inputContainer">

        <div className="mb-3">
          <label htmlFor="title-input" className="form-label">Title</label>
          <input type="text" className="form-control" id="title-input" placeholder="제목을 입력하세요." onChange={titleChange} />
        </div>

        <div className="mb-3" >
          <label htmlFor="content-textarea" className="form-label">Content</label>
          <textarea className="form-control" id="content-textarea" rows="9" placeholder="내용을 입력하세요." onChange={contentChange}></textarea>
        </div>

        <div className="hastag-contianer">
          <label htmlFor="hashtag-input" className="form-label">Hashtag</label>
          <InputGroup className="mb-3" onChange={onChangeHashtag}>
            <Form.Control
              placeholder="태그를 입력하세요."
              aria-label="태그를 입력하세요."
              aria-describedby="basic-addon2"
              id="hashtag-input"
              value={hashtag}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={addHashtag} >
              추가
            </Button>
          </InputGroup>
        </div>

        <div className="hashtag-container">
          {hashtags.map(e =>
            <Badge bg="info" className="hashtag-badge" onClick={onDeleteHash}>{e}</Badge>)}
        </div>

        <div style={{ "display": "flex" }}>
          <div>
            <label htmlFor="memberCount" className="form-label">인원</label>
            <Form.Select aria-label="memberCount" className="form-select"
              onChange={(e) => {
                setPeople(e.target.value);
                setApplyPeople([userId]);
              }}>
              <option>인원 수</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </Form.Select>
          </div>

          <div className="addr-container">
            <label htmlFor="addr" className="addr-label">스터디 지역</label>
            <div className="addr" >
              <Addr propFunction={getAddr} />
            </div>
          </div>

          <div className="calendar-container">
            <label htmlFor="calendar" className="calendar-label" >스터디 시작 날짜</label>
            <div className="calendar" >
              <Calendar onChange={(e) => setValueDate(e)}
                formatDay={(locale, date) => moment(date).format("DD")} />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Upload Image</label>
          <input className="form-control" type="file" id="formFile" onChange={imgChange} />
        </div>
        <div className="btn-submit">
          <button type="button" className="btn btn-light" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Box >
  )
}
export default StudyWrite;
