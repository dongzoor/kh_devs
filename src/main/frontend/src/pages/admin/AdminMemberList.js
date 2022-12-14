
import Table from 'react-bootstrap/Table';
import './admin.css'
import styled from "styled-components";
import { useEffect, useState } from "react";
import Adminheader from './Adminheader';
import AdminApi from '../../api/AdminApi';
import { Link } from 'react-router-dom';
import UserApi from '../../api/UserApi';


const Adcontainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
min-height: 100vh;
background: linear-gradient(90deg, #ffe7e8, #8da4d0);
font-family: 'Gowun Dodum', sans-serif;

`;

function AdminMemberList() {

  const [members, setMembers] = useState([]); // 멤버조회
  const [deleteadmem, setDeleteadmem] = useState(false); //멤버삭제

  useEffect(() => {
    const MemberData = async () => {
      try {
        const response = await AdminApi.admemberList()
        setMembers(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    MemberData();
  }, []);

  const clickDelMem = async (e) => {
    console.log("멤버 삭제 버튼 클릭");
    const response = await AdminApi.deleteAdmem(e);
    console.log(response.data.result);
    if (response.data.result === "OK") {
      setDeleteadmem(true);
    } else setDeleteadmem(false);
  };
  




  return (
    <>
      <Adminheader></Adminheader>
      <Adcontainer>
        <div>
          <h1 className='adTitle'> 회원 리스트</h1>
          <Table striped bordered hover size="sm" className='table_admemberlist'>
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
              {members &&
                members.map((list) => (
                  <tr key={list.userId}>

                    <td>{list.userEmail}</td>
                    <td>{list.password}</td>
                    <td>{list.userNickname}</td>
                    <td>{list.phone}</td>
                    <td>{list.createDate}</td>
                    <td><button className='adbutton delete' onClick={clickDelMem}>삭제</button>
                    <Link to={'/Profile'} style={{ textDecoration: "none" , color : "inherit"}}><button className='adbutton serch' >조회</button></Link>
                    <Link to={`/AdminMember/${list.userId}`} style={{ textDecoration: "none" , color : "inherit"}} ><button className='adbutton edit'>수정</button> </Link>
                      <button className='adbutton delete'>미정</button>
                    </td>
                  </tr>
                ))}
              {/* <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
            </tbody>
          </Table>

        </div>
      </Adcontainer>

    </>

  );
}

export default AdminMemberList;