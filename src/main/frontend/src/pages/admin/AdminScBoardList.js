import Table from 'react-bootstrap/Table';
import './admin.css'
import styled from "styled-components";
import Adminheader from './Adminheader';
import { useEffect, useState } from 'react';
import AdminApi from '../../api/AdminApi';
import Loading from '../../utill/Loading';
import { Link, useNavigate, useParams } from 'react-router-dom';



const Adcontainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
min-height: 100vh;
background: linear-gradient(90deg, #ffe7e8, #8da4d0);
font-family: 'Gowun Dodum', sans-serif;
`;



function AdminScBoardList() {

    const navigate = useNavigate();
    const params = useParams().socialId;
    const [adSocialboard, setAdSocialboard] = useState(); // 스터디게시판 조회
    const [loading, setLoading] = useState(false);


    

    useEffect(() => {
        const BoardData = async () => {
            setLoading(true);
            try {
                const response = await AdminApi.adSocialboardList()
                setAdSocialboard(response.data);
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
    const onClickUpdate = async (e) => {
        console.log("클릭 : ", e);
        navigate(`/social/${e}/update`);
      };


    const onClickDelete = async (e) => {
        const res = await AdminApi.socialAdDelete(e);
        console.log("삭제 버튼 클릭");
        
        if (res.data.result === "SUCCESS") {
            
          console.log("삭제 완료!");
          setLoading(true);
        //   navigate("/AdminScBoarList")
        //   alert("삭제 완료");
        // window.location.reload();
        } else {
          console.log("삭제 실패 ");
          console.log(res.data.result);
          setLoading(false);
        }

      };

    


    return (
        <>
            <Adminheader></Adminheader>
            <Adcontainer>
                <div>
                    <h1 className='adTitle'> 자유 게시판  리스트 &nbsp;<i class="fi fi-rr-document"></i></h1>
                    <Table striped bordered hover size="sm" className='table_adboardlist'>
                        <thead>
                            <tr>
                                <th>제목</th>
                                <th>내용</th>
                                <th>작성자</th>
                                <th>조회수</th>
                                <th>생성시간</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adSocialboard &&
                                adSocialboard.map((list) => (
                                    <tr key={list.socialId}>

                                        <td>{list.title}</td>
                                        <td>{list.content.substr(0, 7)}...</td>
                                        <td>{list.user}</td>
                                        <td>{list.view}</td>
                                        <td>{list.postDate}</td>
                                        <td>
                                           <button className='adbutton delete' onClick={()=>onClickDelete(list.socialId)}>삭제</button>
                                            <Link to={`/social/${list.socialId}`} style={{ textDecoration: "none" , color : "inherit"}}><button className='adbutton serch' >조회</button></Link>
                                            <button className='adbutton edit'onClick={()=>onClickUpdate(list.socialId)}>수정</button>
                                            <button className='adbutton warning'>미정</button>
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

export default AdminScBoardList;
