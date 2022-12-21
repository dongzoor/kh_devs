import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import MyPageApi from '../../api/MyPageApi';
import MyPageNav from './components/MyPageNav';
import { Link } from 'react-router-dom';
import './MyPage.css'
import JwModal from "../../utill/JwModal";

const MyComment = () => {

  // 로그인 시 세션 스토리지에 설정한 userId 가져오기
  const userId = sessionStorage.getItem("userId");
  // 작성 댓글(소셜 게시판) 조회
  const [myCommentList, setMyCommentList] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // 모달 오픈 시 Social Id 값을 넘겨줌(개별 댓글 삭제용)
  const [modalData, setModalData] = useState(0);

  useEffect(() => {
    const MyCommentData = async () => {
        setLoading(true);
        try {
          console.log("User Id : " + userId);
          // 로그인된 userId로 작성된 댓글 조회
          const response = await MyPageApi.myCommentList(userId)
          setMyCommentList(response.data);  
          console.log("작성글 리스트" + response.data);
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
    };
    MyCommentData();
  }, []);

  if (loading) {
    return <p>∘✧₊⁺ 𝑳𝒐𝒅𝒊𝒏𝒈... ⁺₊✧∘</p>
  }

  // 작성 댓글 삭제
  const delConfirmSccModal = async (e) => {
    console.log("삭제 버튼 클릭");
    setModalOpen(false);
    const response = await MyPageApi.myCommnetDelete(e);
  
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
        <div className='myPageTable'>
          <Table className='myCommentTable' striped bordered hover size="sm">
            <thead>
              <tr className='myPageTableTr'>
                <th>댓글 / 작성일</th>
              </tr>
            </thead>
            <tbody>
              {myCommentList && myCommentList.map((list) => (
                <tr key={list.id}>
                  <td className='msc-td'>
                    <button className='deleteButton' onClick={() => openModal
                    (list.id)}>
                        삭제
                    </button>
                    {modalOpen && (
                      <JwModal open={modalOpen} confirm={() => delConfirmSccModal(modalData)} close={closeModal} type={true} header="삭제 확인">
                        정말 삭제하시겠습니까?
                      </JwModal>
                    )}
                    <Link to={`/social/${list.socialId}`} style={{ textDecoration: 'none', color: 'black'}} >
                      <div className='commnetContent'>{list.content}</div>
                      <div className='commnetPostDate'>{list.postDate}</div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
    </div>
)
}
export default MyComment;