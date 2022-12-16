import "./admin.css";

import { useEffect, useState } from "react";

import AdminApi from "../../api/AdminApi";
import Adminheader from "./Adminheader";
import JwModal from "../../utill/JwModal";
import { Link } from "react-router-dom";
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

function AdminMemberList() {
  const [members, setMembers] = useState([]); // 멤버조회
  const [deleteadmem, setDeleteadmem] = useState(false); //멤버삭제
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  /// 페이지 네그네이션
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10); // 페이지별 목록 개수

  useEffect(() => {
    const MemberData = async () => {
      setLoading(true);
      try {
        const response = await AdminApi.admemberList();
        setMembers(response.data);
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
      window.location.replace("/AdminMemberList");
    } else setDeleteadmem(false);
    setLoading(false);
  };

  const openModal = () => {
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
          <h1 className="adTitle"> 회원 리스트</h1>
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
                <th>비밀번호</th>
                <th>이름</th>
                <th>전화번호</th>
                <th>가입시간</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {members
                .slice(items * (page - 1), items * (page - 1) + items)
                .map((list) => (
                  <tr key={list.userId}>
                    <td>{list.userEmail}</td>
                    <td>{list.password}</td>
                    <td>{list.userNickname}</td>
                    <td>{list.phone}</td>
                    <td>{list.createDate}</td>
                    <td>
                      <>
                        <button className="adbutton delete" onClick={openModal}>
                          삭제
                        </button>
                        {modalOpen && (
                          <JwModal
                            open={modalOpen}
                            confirm={() => confirmMemModal(list.userId)}
                            close={closeModal}
                            type={true}
                            header="확인"
                          >
                            정말 삭제하시겠습니까?
                          </JwModal>
                        )}
                      </>
                      <Link
                        to={"/Profile"}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <button className="adbutton serch">조회</button>
                      </Link>
                      <Link
                        to={`/AdminMember/${list.userId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <button className="adbutton edit">수정</button>{" "}
                      </Link>
                      <button className="adbutton delete">미정</button>
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
              pageRangeDisplayed={10}
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>
        </div>
      </Adcontainer>
    </>
  );
}

export default AdminMemberList;
