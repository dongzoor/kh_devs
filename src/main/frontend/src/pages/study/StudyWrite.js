import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid"
import { ref, uploadString, getDownloadURL, deleteObject } from "@firebase/storage";
import { storageService } from "../../api/fbase";
import StudyApi from "../../api/StudyApi";
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

  .inputContainer {
    width: 60%;
    height: 120vh;
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
      height: 130vh;
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
  const [hashtag, setHashtag] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [tagStatus, setTagStatus] = useState(false);
  const [valueDate, setValueDate] = useState(new Date());
  const [people, setPeople] = useState(""); // ?????? ??????
  const [addr, setAddr] = useState("");
  const [applyPeople, setApplyPeople] = useState([]); //????????? ??????

  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const userNickName = sessionStorage.getItem("userNickname");
  let attachmentUrl = "";
  //?????? ?????? ?????? ???????????? ???????????? ?????? ?????? ???????????? ?????? ?????? ""??? ????????????.
  //????????? ??? ???????????? ????????? ????????? url ""??? ???????????? ??????

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

    if (title === "" || content === "") {
      alert("??? ????????? ????????? ?????? ?????????????????????. ??? ?????????????????? ???");
    } else {

      //????????? ???????????? ?????? ???????????? ????????? ?????? ?????? ?????? ????????? attachment??? ???????????? ?????? ?????? ??????
      //????????? ???????????? ?????? ????????? attachmentUrl=""??? ??????.
      if (attachment !== "") {
        //?????? ?????? ?????? ?????????
        const attachmentRef = ref(storageService, `/STUDY/${uuidv4()}`); //const fileRef = ref(storageService, `${ studyObj.studyId } / ${ uuidv4() }`);
        //storage ?????? ????????? ?????? ????????? ??????                                            ?????? ?????? ??????????????? ????????? ???????????? ?????? ?????????
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );
        //storage ?????? ????????? ?????? ????????? URL??? ?????????????????? attachmentUrl ????????? ????????? ????????????
        attachmentUrl = await getDownloadURL(response.ref);
        // console.log(attachmentUrl);
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

      // console.log(studyReg);

      // console.log(studyReg.statusText);
      if (studyReg.statusText === "OK")
        window.confirm("????????? ????????? ?????????????????????.");
      navigate("/studies");
    }
  };

  // const onDelete = async () => {
  //   const urlRef = ref(storageService, attachmentUrl);
  //   try {
  //     if (attachmentUrl !== "") {
  //       await deleteObject(urlRef);
  //     }
  //   } catch (error) {
  //     window.alert("???????????? ???????????? ??? ??????????????????!");
  //   }
  // };

  const onChangeHashtag = (e) => {
    const {
      target: { value }
    } = e;
    setHashtag(value);
  }

  const addHashtag = (e) => {
    if (hashtag === "" || hashtag.length > 10 || hashtags.length > 4) {
      alert("??? ??????????????? 10??? ????????? ????????? ?????? 5????????? ?????? ??????????????? ???");
    } else {
      setHashtags([...hashtags, hashtag]);
      setTagStatus(true);
    }
  };

  const onDeleteHash = (index) => {
    hashtags.splice(index, 1);
    setTagStatus(true);
  };

  useEffect(() => {
    setTagStatus(false);
    setHashtag('');
  }, [tagStatus, hashtags]);

  const getAddr = (e) => {
    setAddr(e);
    // console.log(addr + " " + valueDate + " " + people);
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
          <input type="text" className="form-control" id="title-input" placeholder="????????? ???????????????." onChange={titleChange} />
        </div>

        <div className="mb-3" >
          <label htmlFor="content-textarea" className="form-label">Content</label>
          <textarea className="form-control" id="content-textarea" rows="9" placeholder="????????? ???????????????." onChange={contentChange}></textarea>
        </div>

        <div className="hastag-contianer">
          <label htmlFor="hashtag-input" className="form-label">Hashtag</label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="????????? ???????????????."
              aria-label="????????? ???????????????."
              aria-describedby="basic-addon2"
              id="hashtag-input"
              value={hashtag}
              onChange={onChangeHashtag}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={addHashtag} >
              ??????
            </Button>
          </InputGroup>
        </div>

        <div className="hashtag-container">
          {hashtags.map((e, index) =>
            <Badge bg="info" className="hashtag-badge" key={index} onClick={() => onDeleteHash(index)}> #{e} </Badge>)}
        </div>

        <div className="studyInfo-container">
          <div className="member-container">
            <label htmlFor="memberCount" className="form-label">??????</label>
            <Form.Select aria-label="memberCount" className="form-select"
              onChange={(e) => {
                setPeople(e.target.value);
                setApplyPeople([userNickName]);
              }}>
              <option>?????? ???</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </Form.Select>
          </div>

          <div className="addr-container">
            <label htmlFor="addr" className="addr-label">????????? ??????</label>
            <div className="addr" >
              <Addr propFunction={getAddr} />
            </div>
          </div>

          <div className="calendar-container">
            <label htmlFor="calendar" className="calendar-label" >????????? ?????? ??????</label>
            <div>
              <Calendar className="calendar" onChange={(e) => setValueDate(e)}
                formatDay={(locale, date) => moment(date).format("DD")} />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Upload Image</label>
          <input className="form-control" type="file" id="formFile" onChange={imgChange} />
        </div>
        <div className="btn-submit">
          <button type="submit" className="btn btn-light" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Box >
  )
}
export default StudyWrite;
