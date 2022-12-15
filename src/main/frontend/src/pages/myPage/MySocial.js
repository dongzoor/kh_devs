import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import MyPageApi from '../../api/MyPageApi';
import MyActivityNav from './components/MyActivityNav';
import { Link } from 'react-router-dom';
import './MyPage.css'

const MySocial = () => {

  // 작성글(소셜 게시판) 조회
  const [mySocialboard, setMySocialboard] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const MySocialDate = async () => {
        setLoading(true);
        try {
          // 로그인 시 세션 스토리지에 설정한 userId를 가져와서 해당 userId로 작성된 글 조회
          const getUserId = sessionStorage.getItem("userId")
          const response = await MyPageApi.mySocialList(getUserId)
          setMySocialboard(response.data);  
          console.log(response.data);
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
    };
    MySocialDate();
  }, []);

  if (loading) {
    return <p>∘✧₊⁺ 𝑳𝒐𝒅𝒊𝒏𝒈... ⁺₊✧∘</p>
  }

  // 삭제 확인 모달 추가 예정
  const onClickDelete = async (e) => {
    const res = await MyPageApi.mySocialDelete(e);
    console.log("삭제 버튼 클릭");
    
    if (res.data.result === "SUCCESS") {
      console.log("삭제 완료");
      setLoading(true);
    } else {
      console.log("삭제 실패");
      console.log(res.data.result);
      setLoading(false);
    }
  };

  const onClickAllDelete = async (e) => {
    const res = await MyPageApi.mySocialAllDelete(e);
    console.log("삭제 버튼 클릭");
    
    if (res.data.result === "SUCCESS") {
      console.log("삭제 완료");
      setLoading(true);
    } else {
      console.log("삭제 실패");
      console.log(res.data.result);
      setLoading(false);
    }
  };

  return (
      <div className='myPageContainer'>
          <MyActivityNav />
          <div className='myPageTable'>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>제목</th>
                  <th>작성일</th>
                  <th>조회</th>
                </tr>
              </thead>
              <tbody>
                {mySocialboard && mySocialboard.map((list) => (
                  <tr key={list.socialId}>
                    <td>
                      <button onClick={()=>onClickDelete(list.socialId)}>삭제</button>
                      <Link to={`/social/${list.socialId}`}>{list.title}[{list.comment}]</Link>
                    </td>
                    <td>{list.postDate}</td>
                    <td>{list.view}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className='allDeleteBox'>
            <button className='allDeleteButton' onClick={()=>onClickAllDelete()}>전체 삭제</button>
          </div>
      </div>
  )
}

export default MySocial;