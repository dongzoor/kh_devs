import Table from 'react-bootstrap/Table';
import './admin.css'
import styled from "styled-components";
import Adminheader from './Adminheader';
import { useEffect, useState } from 'react';
import AdminApi from '../../api/AdminApi';
import Loading from '../../utill/Loading';
import { Link, useParams } from 'react-router-dom';

const Adcontainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
min-height: 100vh;
background: linear-gradient(90deg, #ffe7e8, #8da4d0);
font-family: 'Gowun Dodum', sans-serif;
`;

const AdTable = styled.div`
display: flex;
align-items: center;
justify-content: center;

`;

function AdminBoardList() {

 
  const params = useParams().studyId;
  const [adstudyboard, setAdstudyboard] = useState([]); // 스터디게시판 조회
  const [loading, setLoading] = useState(false);
  const [deleteAdBoard, setDeleteAdBoard] = useState(false); //멤버삭제

 



  // 스터디 게시판 삭제
  const clickDelBoard = async (e) => {
    console.log("삭제 버튼 클릭");
    const response = await AdminApi.deleteStudyBoard(e);
    setLoading(true);
    setDeleteAdBoard(true)
    // console.log(response.data);
    // if (response.data) {
    //   setLoading(true);
    //   setDeleteAdBoard(true);
    // } else setDeleteAdBoard(false);
    // setLoading(false);
  };


  useEffect(() => {
    const BoardData = async () => {
      setLoading(true);
      try {
        const response = await AdminApi.adstudyboardList()
        setAdstudyboard(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    BoardData();
  }, [loading]);

  if (loading) {
    return <Loading></Loading>;
  }



  return (
    <>
      <Adminheader></Adminheader>
      <Adcontainer>
        <div>
          <h1 className='adTitle'>스터디 게시판 리스트&nbsp;<i class="fi fi-rr-document"></i></h1> 
          <Table striped bordered hover size="sm" className='table_adboardlist'>
            <thead>
              <tr>
                <th>제목</th>
                <th>내용</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>생성시간</th>
                <th>모집현황</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {adstudyboard &&
                adstudyboard.map((list) => (
                  <tr key={list.id}>

                    <td>{list.title}</td>
                    <td>{list.content.substr(0, 7)}...</td>
                    <td>{list.writer}</td>
                    <td>{list.cnt}</td>
                    <td>{list.updateTime}</td>
                    <td>{list.coordinate}</td>
                    <td>
                      <button className='adbutton delete' onClick={()=>clickDelBoard(list.id)} >삭제</button>
                      <Link to={`/study/${list.id}`} style={{ textDecoration: "none" , color : "inherit"}}><button className='adbutton serch' >조회</button></Link>
                      <button className='adbutton edit'>수정</button>
                      <button className='adbutton delete'>미정</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Adcontainer>
    </>
  );
}

export default AdminBoardList;
