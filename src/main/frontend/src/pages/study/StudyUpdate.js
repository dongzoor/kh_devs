import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid"
import { ref, uploadString, getDownloadURL, deleteObject } from "@firebase/storage";
import { storageService } from "../../lib/api/fbase";
import StudyApi from "../../lib/api/StudyApi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Box = styled.div`
  margin: 0;
  padding: 0;
  font-family: Raleway, Pretendard Std;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
`;
const InputContainer = styled.div`
  width: 40vw;
  height: 80vh;
  margin: 0 auto;
  padding: 15px;
  background-color: #FFF;
  box-shadow: 0px 0px 24px #5c5696;
  border-radius: 25px;
`;
const StudyWrite = (studyObj) => {
  const [attachment, setAttachment] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [studyDetail, setStudyDetail] = useState("");
  const params = useParams().studyId;

  let attachmentUrl = "";
  let preImgUrl = "";

  if (studyDetail.imgUrl) preImgUrl = studyDetail.imgUrl;



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
          attachmentUrl
        );
        console.log(studyUpdate);
        window.location.replace("/studies");
      } else { //첨부한게 없을 때 (이미지 유지)

        const studyUpdate = await StudyApi.studyUpdate(
          params,
          title,
          content,
          preImgUrl
        );
        console.log(studyUpdate);
        window.location.replace("/studies");
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
      }
      const studyUpdate = await StudyApi.studyUpdate(
        params,
        title,
        content,
        attachmentUrl
      );
      console.log(studyUpdate);
      window.location.replace("/studies");
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

  useEffect(() => {
    const StudyData = async () => {
      try {
        const response = await StudyApi.studyDetail(params);
        console.log(params);
        // const response = await StudyApi.studyUpdate(parseInt(params), title, content, attachmentUrl);
        // const SetUserId = await UserApi.~~~//api로 정보 가져와야함
        setStudyDetail(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    StudyData();

  }, []);

  return (
    <Box>
      <InputContainer style={{ "marginTop": "5vh" }}>
        <div className="mb-3">
          <label htmlFor="title-input" className="form-label">Title</label>
          <input type="email" className="form-control" id="title-input" placeholder="제목을 입력하세요." onChange={titleChange} defaultValue={studyDetail.title} />
        </div>
        <div className="mb-3" style={{}}>
          <label htmlFor="content-textarea" className="form-label">Content</label>
          <textarea className="form-control" id="content-textarea" rows="20" placeholder="내용을 입력하세요." onChange={contentChange} defaultValue={studyDetail.content}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Upload Image</label>
          <input className="form-control" type="file" id="formFile" onChange={imgChange} defaultValue={studyDetail.imgUrl} />
        </div>
        <img src={studyDetail.imgUrl} alt="no image" style={{ "width": "5vw", "height": "5vh" }} />
        <button type="button" className="btn btn-light" style={{ "float": "right" }} onClick={onSubmit}>
          Update
        </button>
      </InputContainer>
    </Box>
  )
}
export default StudyWrite;
