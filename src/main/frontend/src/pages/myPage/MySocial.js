import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import MyPageApi from '../../api/MyPageApi';
import MyPageNav from './components/MyPageNav';
import { Link } from 'react-router-dom';
import './MyPage.css'
import JwModal from "../../utill/JwModal";
// import Pagination from "react-js-pagination";
// import styled from "styled-components";

const MySocial = () => {

  // 로그인 시 세션 스토리지에 설정한 userId 가져오기
  const userId = sessionStorage.getItem("userId");
  // 작성글(소셜 게시판) 조회
  const [mySocialList, setMySocialList] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // 모달 오픈 시 Social Id 값을 넘겨줌(개별 게시글 삭제용)
  const [modalData, setModalData] = useState(0);

  useEffect(() => {
    const MySocialData = async () => {
        setLoading(true);
        try {
          console.log("User Id : " + userId);
          // 로그인된 userId로 작성된 글 조회
          const response = await MyPageApi.mySocialList(userId)
          setMySocialList(response.data);  
          console.log("작성글 리스트" + response.data);
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
    };
    MySocialData();
  }, []);

  if (loading) {
    return <p>∘✧₊⁺ 𝑳𝒐𝒅𝒊𝒏𝒈... ⁺₊✧∘</p>
  }

  // 작성글 개별 삭제
  const delConfirmScModal = async (e) => {
    console.log("삭제 버튼 클릭");
    setModalOpen(false);
    const response = await MyPageApi.mySocialDelete(e);

    if (response.data.result === "OK") {
      console.log("삭제 완료");
      setLoading(true);
      window.location.reload();
    } else {
      console.log("삭제 실패");
      console.log(response.data.result);
      setLoading(false);
    }
  };

  // 작성글 전체 삭제
  // const allDelConfirmScModal = async (e) => {
  //   console.log("전체 삭제 버튼 클릭");
  //   setModalOpen(false);
  //   const response = await MyPageApi.mySocialAllDelete(e);
  //   console.log(response.data.userId);
  //   if (response.data) {
  //     console.log("삭제 완료");
  //     setLoading(true);
  //     window.location.reload();
  //   } else {
  //     console.log("삭제 실패");
  //     console.log(response.data.result);
  //     setLoading(false)
  //   };
  // };

  const openModal = (e) => {
    setModalData(e);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
      <div className='myPageContainer'>
          <MyPageNav />
          <div className='container-fluid' id='myPageTable'>
            <Table className='myPageTable' striped bordered hover size="sm">
              <thead>
                <tr className='myPageTableTr'>
                  <th className='ms-th-1'>제목</th>
                  <th className='ms-th-2'>작성일</th>
                  <th className='ms-th-3'>조회</th>
                </tr>
              </thead>
              <tbody>
                {mySocialList && mySocialList.map((list) => (
                  <tr key={list.socialId}>
                    <td className='ms-td-1'>
                      <button className='deleteButton' onClick={() => openModal(list.socialId)}>
                        삭제
                      </button>
                      {modalOpen && (
                        <JwModal open={modalOpen} confirm={() => delConfirmScModal(modalData)} close={closeModal} type={true} header="삭제 확인">
                          정말 삭제하시겠습니까?
                        </JwModal>
                      )}
                      <Link to={`/social/${list.socialId}`} style={{ textDecoration: 'none', color: 'black'}}>
                        <div className='mySocialTitle'>{list.title}　</div>
                        <div className='mySocialCommNum'>[{list.comment}]</div>
                      </Link>
                    </td>
                    <td className='ms-td-2'>{list.postDate}</td>
                    <td className='ms-td-3'>{list.view}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* 페이지네이션 추가 예정 */}
      </div>
  )
}

export default MySocial;