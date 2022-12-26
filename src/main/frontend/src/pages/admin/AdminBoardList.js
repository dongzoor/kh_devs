import "./admin.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import AdminApi from "../../api/AdminApi";
import Adminheader from "./Adminheader";
import JwModal from "../../utill/JwModal";
import Loading from "../../utill/Loading";
import Pagination from "react-js-pagination";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

const Adcontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
  font-family: "Gowun Dodum", sans-serif;
  .Adphotos {
    margin: 5px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .Boardphotos {
    height: 50px;
    width: 90px;
    border-radius: 10px;
    left: 5px;
    top: 5px;
  }
  .tbody{
    text-align: center;
    align-items : center;
    justify-content : center;
  }
  
`;

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #9691db;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #9691db;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #4a4688;
  }
`;

function AdminBoardList() {
  const navigate = useNavigate();
  const params = useParams().studyId;
  const [adstudyboard, setAdstudyboard] = useState([]); // 스터디게시판 조회
  const [loading, setLoading] = useState(false);
  const [deleteAdBoard, setDeleteAdBoard] = useState(false); //멤버삭제
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(0);
  const [searchData , setSearchData] = useState('');
  /// 페이지 네그네이션
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10); // 페이지별 목록 개수

  useEffect(() => {
    const BoardData = async () => {
      setLoading(true);
      try {
        const response = await AdminApi.adstudyboardList();
        setAdstudyboard(response.data);
        // console.log(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    BoardData();
  }, []);

  // 페이지 네이션 이동
  const handlePageChange = (page) => {
    setPage(page);
  };
  const itemChange = (e) => {
    setItems(Number(e.target.value));
  };

  console.log(items * (page - 1), items * (page - 1) + items);

  // 스터디 게시판 삭제
  const confirmModal = async (e) => {
    // console.log("삭제 버튼 클릭");
    setModalOpen(true);
    const response = await AdminApi.deleteStudyBoard(e);
    // console.log(response.data);
    if (response.data) {
      setLoading(true);
      setDeleteAdBoard(true);
      // navigate("/AdminBoardList")
      window.location.reload();
    } else setDeleteAdBoard(false);
    setLoading(false);
  };

  const openModal = (e) => {
    setModalData(e);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Adminheader></Adminheader>
      <Adcontainer>
        <div>
          <h1 className="adTitle">
            스터디 게시판 리스트&nbsp;<i class="fi fi-rr-document"></i>
          </h1>
          <div>         
        <input
        type="text"
        placeholder="Search... &#61442;"
        className="search"
        onChange={(e) => setSearchData(e.target.value)}
        >
        </input>
        </div>
          <Table striped bordered hover  className="table_adboardlist">
            <thead>
              <tr>
                <th>제목</th>
                <th>내용</th>
                <th>게시글 사진</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>생성시간</th>
                <th>모집현황</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {/* 페이지네이션 잘라내기 */}
              {adstudyboard.filter((list) => list.title.toLowerCase().includes(searchData) ||
                                  list.content.toLowerCase().includes(searchData) ||
                                  list.user.userNickname.toLowerCase().includes(searchData)
                
                )
                .slice(items * (page - 1), items * (page - 1) + items)
                .map((list) => (
                  <tr key={list.id}>
                    <td>{list.title.substr(0, 10)}</td>
                    <td>{list.content.substr(0, 10)}...</td>
                    <td><img
                          className="Boardphotos"
                          alt="게시글 사진"
                          src={
                            list.imgUrl
                              ? list.imgUrl
                              : "https://i.ibb.co/0shjfhn/no-photo-available.png"
                          }
                        /></td>
                    <td>{list.user.userNickname}
                    <img
                          className="Adphotos"
                          alt="프로필 사진"
                          src={
                            list.user.profileImagePath
                              ? list.user.profileImagePath
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                    </td>
                    <td>{list.cnt}</td>
                    {/* {social.postDate.slice(0, 3).join("-")} */}
                    {/* {String(list.regTime).substring([0],[16])} */}
                    <td>{list.regTime.slice(0,5).join("-")}</td>
                    <td>{list.studyApplyCount}</td>
                    <td>
                      <>
                        <button className="adbutton delete" onClick={() => openModal(list.id)}>
                          삭제
                        </button>
                        {modalOpen && (
                          <JwModal
                            open={modalOpen}
                            confirm={() => confirmModal(modalData)}
                            close={closeModal}
                            type={true}
                            header="확인"
                          >
                            정말 삭제하시겠습니까?
                          </JwModal>
                        )}
                      </>
                      <Link
                        to={`/study/${list.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <button className="adbutton serch">조회</button>
                      </Link>
                      <Link  to={`/study/${list.id}/update`}
                        style={{ textDecoration: "none", color: "inherit" }}>
                      <button className="adbutton edit">수정</button>
                      </Link>
                      <Link
                      to={`/study/write`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      >
                      <button className="adbutton warning">작성</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={items}
              totalItemsCount={adstudyboard.length - 1}
              pageRangeDisplayed={10}
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>
        </div>
      </Adcontainer>
    </>
  );
}

export default AdminBoardList;
