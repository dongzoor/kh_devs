import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudyApi from "../../lib/api/StudyApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Badge} from "react-bootstrap";

const Box = styled.div`
  margin: -50px;
  padding: 0;
  font-family: Raleway, Pretendard Std;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
`;

const Hr = styled.div`
  width: 650px;
  height: 10px;
  border: 0;
  box-shadow: 0 10px 10px -10px #8c8c8c inset;
  margin: 0 auto;
`
const CardContainer = styled.div`
  width: 50vw;
  margin: 0 auto;

  & + & {
    margin: 50px auto;
  }
`

const Study = () => {
  const [studyList, setStudyList] = useState([]);
  useEffect(() => {
    const StudyData = async () => {
        const response = await StudyApi.studyList();
        setStudyList(response.data);
        console.log(response.data);
    }
    StudyData();
  }, []);

  return (
    <>
      <Box>
        <div className="input-group rounded" style={{ "width": "500px", "margin": "50px auto" }}>
          <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <span className="input-group-text border-0" id="search-addon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        {studyList &&
          studyList.map((list) =>
            list.imgUrl ?
              <li key={list.id}>
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
              </li>
              :
              <li key={list.id}>
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
              </li>
          )}
      </Box>
    </>
  );
}

export default Study;