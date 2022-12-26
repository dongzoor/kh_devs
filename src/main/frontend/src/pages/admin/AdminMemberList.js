import "./admin.css";

import { useEffect, useState } from "react";

import AdminApi from "../../api/AdminApi";
import Adminheader from "./Adminheader";
import JwModal from "../../utill/JwModal";
import { Link, useParams } from "react-router-dom";
import Loading from "../../utill/Loading";
import Pagination from "react-js-pagination";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";

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
  .search {
    background-color: #9691db;
    padding: 50px;
  }
  
`;

function AdminMemberList() {
  const params = useParams().userId;
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [members, setMembers] = useState([]); // 멤버조회
  const [deleteadmem, setDeleteadmem] = useState(false); //멤버삭제
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [modalData, setModalData] = useState(0);
  const [banModalData, setBanModalData] = useState('');
  const [searchData , setSearchData] = useState('');
  /// 페이지 네그네이션
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(8); // 페이지별 목록 개수

  useEffect(() => {
    const MemberData = async () => {
      setLoading(true);
      try {
        const response = await AdminApi.admemberList();
        const originEmail = response.data.userEmail;
        const originNickname = response.data.userNickname;
        const originPhone = response.data.phone;
        setMembers(response.data);
        setUserEmail(originEmail);
        setUserNickname(originNickname);
        setPhone(originPhone);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    MemberData();
  }, []);

  // 페이지 네이션 이동
  const handlePageChange = (page) => {
    setPage(page);
  };
  const itemChange = (e) => {
    setItems(Number(e.target.value));
  };

  console.log(items * (page - 1), items * (page - 1) + items);

  const confirmMemModal = async (e) => {
    setModalOpen(true);
    const deleteUser = await AdminApi.admemberdelete(e);
    console.log(deleteUser.data.userId);
    if (deleteUser.data) {
      setLoading(true);
      setDeleteadmem(true);
      window.location.reload();
    } else setDeleteadmem(false);
    setLoading(false);
  };

  const confirmBanModal = async (e) => {
    setModalOpen(true);
    const response = await AdminApi.admemberDetail(e);
    const BanUser = await AdminApi.AdUserBanUpdate(
      response.data.userId,
      response.data.userEmail, 
      response.data.userNickname,
      response.data.phone,
      );
    console.log(BanUser.data);
    if (BanUser.data === true) {     
      window.location.replace("/AdminMemberList");
    } else 
    setLoading(false);
  };

  const openBanModal = (e) => {
    setBanModalData(e);
    setBanModalOpen(true);
  };



  const openModal = (e) => {
    setModalData(e);
    setModalOpen(true);
  };

  const closeModal = () => {
    setBanModalOpen(false);
    setModalOpen(false);
  };

//   const search = (data) => {
// return data.filter(list => list.first_name.toLowerCase().includes(searchData))
//   }


  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Adminheader></Adminheader>
      <Adcontainer>
        <div>
          <h1 className="adTitle"> 회원 리스트&nbsp;<i class="fi fi-rr-user"></i></h1>
          {/* 검색기능 창 */}
          <div>         
        <input
        type="text"
        placeholder="Search... &#61442;"
        className="search"
        onChange={(e) => setSearchData(e.target.value)}
        >
        </input>
        </div>
          <Table
            striped
            bordered
            hover
            size="sm"
            className="table_admemberlist"
        
          >
            <thead>
              <tr>
                <th>이메일아이디</th>
                {/* <th>비밀번호</th> */}
                <th>닉네임</th>
                <th>전화번호</th>
                <th>가입시간</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {members
              // 검색기능 필터
                .filter((list) => list.userNickname.toLowerCase().includes(searchData) ||
                                  list.userEmail.toLowerCase().includes(searchData) ||
                                  list.phone.toLowerCase().includes(searchData)
                
                ).slice(items * (page - 1), items * (page - 1) + items)
                .map((list) => (
                  <tr key={list.userId}>
                    <td>{list.userEmail}</td>
                    {/* <td>{list.password}</td> */}
                    <td>{list.userNickname}
                    <img
                          className="Adphotos"
                          alt="프로필 사진"
                          src={
                            list.profileImagePath
                              ? list.profileImagePath
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                        </td>
                    <td>{list.phone}</td>
                    <td>{list.createDate.slice(0,5).join("-")}</td>
                    <td>
                      <>
                        <button className="adbutton delete" onClick={() => openModal(list.userId)}>
                          삭제
                        </button>
                        {modalOpen && (
                          <JwModal
                            open={modalOpen}
                            confirm={() => confirmMemModal(modalData)}
                            close={closeModal}
                            type={true}
                            header="확인"
                          >
                            정말 삭제하시겠습니까?
                          </JwModal>
                        )}
                           {banModalOpen && (
                          <JwModal
                            open={banModalOpen}
                            confirm={() => confirmBanModal(banModalData)}
                            close={closeModal}
                            type={true}
                            header="확인"
                          >
                            정말 차단하시겠습니까?
                          </JwModal>
                        )}
                      </>
                      <Link
                        to={`/myPage/mySocial/${list.userId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <button className="adbutton serch">조회</button>
                      </Link>
                      <Link
                        to={`/AdminMember/${list.userId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <button className="adbutton edit">수정</button>
                      </Link>
                      <button className="adbutton warning" onClick={() => openBanModal(list.userId)}>차단</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={items}
              totalItemsCount={members.length - 1}
              pageRangeDisplayed={8}
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>
        </div>
      </Adcontainer>
    </>
  );
}

export default AdminMemberList;
