import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import MyPageApi from "../../api/MyPageApi";

const CardContainer = styled.div`
  width: 50vw;
  margin: 0 auto;

  & + & {
    margin: 50px auto;
  }
`
const MyStudy = () => {

  // 로그인 시 세션 스토리지에 설정한 userId 가져오기
  const userId = sessionStorage.getItem("userId");
  // 작성글(스터디 게시판) 조회
  const [studyList, setStudyList] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const MyStudyData = async () => {
      setLoading(true);
      try {
        console.log("User Id : " + userId);
        // 로그인된 userId로 작성된 스터디글 조회
        const response = await MyPageApi.myStudyList(userId)
        setStudyList(response.data);  
        console.log("나의 스터디 리스트" + response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
  };
  MyStudyData();
  }, []);

  if (loading) {
    return <p>∘✧₊⁺ 𝑳𝒐𝒅𝒊𝒏𝒈... ⁺₊✧∘</p>
  }
  return (
    <div className="myPageContainer">
      <div className="subTitle">
        <h1>My Study</h1>
      </div>
      <hr />
      {studyList &&
          studyList.map((list) =>
            list.imgUrl ?
              <ul key={list.id}>
                <Link to={`/study/${list.id}`} style={{ "textDecoration": "none" }}>
                  <CardContainer>
                    <div className="card mb-3" style={{ "width": "40vw", "margin": "0 auto", "boxShadow": "0px 0px 24px #5c5696" }}>
                      <div className="row g-0">
                        <div className="col-md-6">
                          <img src={`${list.imgUrl}`} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-5">
                          <div className="card-body">
                            <h5 className="card-title">{`${list.title}`}</h5>
                            <h6 className="card-subtitle mb-2 text-muted" style={{ "float": "right" }}>{`${list.writer}`}</h6>
                            <br />
                            <p className="card-text">{`${list.content}`}</p>
                            {`${list.hashtag}` &&
                              list.hashtag.map((e) => <Badge bg="info" style={{ "marginRight": "0.5vw" }} > {e} </Badge>)}
                          </div>
                          <div className="hashtag-container">

                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContainer>
                </Link>
              </ul>
              :
              <ul key={list.id}>
                <Link to={`/study/${list.id}`} style={{ "textDecoration": "none" }}>
                  <CardContainer>
                    <div className="card" style={{ "width": "40vw", "margin": "0 auto", "boxShadow": "0px 0px 24px #5c5696" }}>
                      <div className="card-body">
                        <h5 className="card-title">{`${list.title}`}
                          <Link to={`/study/${list.studyId}`} />
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted" style={{ "float": "right" }}>{`${list.writer}`}</h6>
                        <br />
                        <p className="card-text"> {`${list.content}`}</p>
                        {`${list.hashtag}` &&
                          list.hashtag.map((e) => <Badge bg="info" style={{ "marginRight": "0.5vw" }} > {e} </Badge>)}
                      </div>
                    </div>
                  </CardContainer>
                </Link>
              </ul>
          )}
    </div>
  )
}
export default MyStudy;