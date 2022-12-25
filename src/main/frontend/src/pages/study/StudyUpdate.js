import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid"
import { ref, uploadString, getDownloadURL, deleteObject } from "@firebase/storage";
import { storageService } from "../../api/fbase";
import StudyApi from "../../api/StudyApi";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import Addr from "./Addr";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

const Box = styled.div`
  margin: 0;
  padding: 0;
  font-family: Raleway, Pretendard Std;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);

  .inputContainer {
    width: 60%;
    height: 77vh;
    margin: 0 auto;
    padding: 15px;
    background-color: #FFF;
    box-shadow: 0px 0px 24px #5c5696;
    border-radius: 25px;
  }

  .hashtag-container {
    height: 2vh;
    margin: -0.8vh 0.2vh 1vh 0;
    }
  
    .hashtag-badge {
      margin-right: 0.5vw; 
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

  .studyInfo-container {
    display: flex;

  }

  .studyInfo-container {
    
    flex-wrap: wrap;

    .member-container {
      width: 10vw;
      
      .form-select {
        width: 50%;
      }
    }

    .addr-container {
      width: 15vw;
      
      .addr {
        width: 100%;
      }
    }

    .calendar-container {
      width: 20vw;
      margin: 5px auto;
      margin-bottom: 10px;

      .calendar {
        width: 100%;
      }
    }
  }


  @media only screen and (max-width: 1200px) {

    .inputContainer {
      width:90vw;
      height: 85vh;
    }

    .studyInfo-container {
      
      flex-wrap: wrap;

      .member-container {
        width: 25vw;
        
        .form-select {
          width: 100%;
        }
      }

      .addr-container {
        width: 60%;
        
        .addr-label {
          width: 50%;
        }
        .addr {
          width: 100%;
        }
      }

      .calendar-container {
        width: 80vw;
        margin: 5px auto;
        margin-bottom: 10px;
      }
  }
  
  }
  
  }
`;

const StudyWrite = (studyObj) => {
  const [attachment, setAttachment] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [studyDetail, setStudyDetail] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [tagStatus, setTagStatus] = useState(false);
  const params = useParams().studyId;
  const [valueDate, setValueDate] = useState(new Date());
  const [people, setPeople] = useState("");
  const [addr, setAddr] = useState("");
  const [applyPeople, setApplyPeople] = useState([]);
  const [addrCity, setAddrCity] = useState();
  const [addrSidong, setAddrSidong] = useState();
  const [dateAry, setDateAry] = useState([]);

  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  let attachmentUrl = "";
  let preImgUrl = "";


  if (studyDetail.imgUrl) preImgUrl = studyDetail.imgUrl;

  useEffect(() => {
    const StudyData = async () => {
      try {
        const response = await StudyApi.studyDetail(params);
        setStudyDetail(response.data);
        setHashtags(response.data.hashtag);

        // console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    StudyData();

  }, []);


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
    // console.log(theFile);

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
    // const userNickname = sessionStorage.getItem("userNickname");

    //이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 attachment가 있을때만 아래 코드 실행
    //이미지 첨부하지 않은 경우엔 attachmentUrl=""이 된다.
    if (preImgUrl) { // 첨부했던 이미지가 있을 때

      if (attachment !== "") { //첨부한게 있을 때
        //파일 경로 참조 만들기

        onDelete();
        const attachmentRef = ref(storageService, `/STUDY/${uuidv4()}`); //const fileRef = ref(storageService, `${ studyObj.studyId } / ${ uuidv4() }`);
        //storage 참조 경로로 파일 업로드 하기                                            위의 거로 바꿔주어야 스터디 아이디에 맞게 저장됨
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );
        //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
        attachmentUrl = await getDownloadURL(response.ref);

        const studyUpdate = await StudyApi.studyUpdate(
          params,
          title,
          content,
          attachmentUrl,
          hashtags,
          people,
          addr,
          valueDate,
          applyPeople
        );
        // console.log(studyUpdate);
        navigate("/studies");
      } else { //첨부한게 없을 때 (이미지 유지)

        const studyUpdate = await StudyApi.studyUpdate(
          params,
          title,
          content,
          preImgUrl,
          hashtags,
          people,
          addr,
          valueDate,
          applyPeople
        );
        // console.log(studyUpdate);
        navigate("/studies");
      }
    } else { // 첨부했던 이미지가 없을 때
      if (attachment !== "") {// 첨부한게 있을 때
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

        const studyUpdate = await StudyApi.studyUpdate(
          params,
          title,
          content,
          attachmentUrl,
          hashtags,
          people,
          addr,
          valueDate,
          applyPeople
        );
        // console.log(studyUpdate);
        navigate("/studies");
      } else {
        const studyUpdate = await StudyApi.studyUpdate(
          params,
          title,
          content,
          attachmentUrl,
          hashtags,
          people,
          addr,
          valueDate,
          applyPeople
        );
        // console.log(studyUpdate);
        navigate("/studies");
      }
    }
  };

  const onDelete = async () => {
    const urlRef = ref(storageService, `/STUDY/${preImgUrl}`);
    try {
      if (attachmentUrl !== "") {
        await deleteObject(urlRef);
      }
    } catch (error) {
      window.alert("이미지를 삭제하는 데 실패했습니다!");
    }
  };

  const onChangeHashtag = (e) => {
    const {
      target: { value }
    } = e;
    setHashtag(value);
  }

  const addHashtag = (e) => {
    setHashtags([...hashtags, hashtag]);

    setTagStatus(true);
  }

  const onDeleteHash = (e) => {

    hashtags.splice(e, 1);
    setTagStatus(true);
  }
  useEffect(() => {
    setTagStatus(false);
    setHashtag("");
  }, [tagStatus, hashtags]);

  const getAddr = (e) => {
    setAddr(e);
    // console.log(addr + " " + valueDate + " " + people);
  }

  return (
    <Box>
      <div className="inputContainer">

        <div className="mb-3">
          <label htmlFor="title-input" className="form-label">Title</label>
          <input type="text" className="form-control" id="title-input" placeholder="제목을 입력하세요." onChange={titleChange} defaultValue={studyDetail.title} />
        </div>

        <div className="mb-3">
          <label htmlFor="content-textarea" className="form-label">Content</label>
          <textarea className="form-control" id="content-textarea" rows="9" placeholder="내용을 입력하세요." onChange={contentChange} defaultValue={studyDetail.content}></textarea>
        </div>

        <div className="hastag-contianer">
          <label htmlFor="hashtag-input" className="form-label">Hashtag</label>
          <InputGroup className="mb-3" >
            <Form.Control
              placeholder="태그를 입력하세요."
              aria-label="태그를 입력하세요."
              aria-describedby="basic-addon2"
              id="hashtag-input"
              value={hashtag}
              onChange={onChangeHashtag}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={addHashtag}>
              추가
            </Button>
          </InputGroup>
        </div>

        <div className="hashtag-container">
          {hashtags.map((e, index) => <Badge bg="info" className="hashtag-badge" key={index} onClick={() => onDeleteHash(index)}>#{e} </Badge>)}
        </div>

        <div className="studyInfo-container">
          <div className="member-container">
            <label htmlFor="memberCount" className="form-label">인원</label>
            <Form.Select aria-label="memberCount" className="form-select"
              key={studyDetail.goalPeople}
              defaultValue={studyDetail.goalPeople}
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
              <Addr propFunction={getAddr}
              />
            </div>
          </div>


          <div className="calendar-container">
            <label htmlFor="calendar" className="calendar-label" >스터디 시작 날짜</label>
            <div>
              <Calendar
                className="calendar"
                onChange={(e) => setValueDate(e)}
                formatDay={(locale, date) => moment(date).format("DD")} />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Upload Image</label>
          <input className="form-control" type="file" id="formFile" onChange={imgChange} defaultValue={studyDetail.imgUrl} />
        </div>

        <img src={studyDetail.imgUrl} alt="no image" style={{ "width": "5vw", "height": "5vh" }} />
        <div className="btn-submit">
          <button type="button" className="btn btn-light" onClick={onSubmit}>
            Update
          </button>
        </div>
      </div>
    </Box >
  )
}
export default StudyWrite;
