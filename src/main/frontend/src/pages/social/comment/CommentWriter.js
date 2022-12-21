import SocialApi from "../../../api/SocialApi";
import styled from "styled-components";

const WriteBlock = styled.div`
  * {
    font-family: "Alfa Slab One", cursive;
    font-size: 20px;
    font-family: "Song Myung", serif;
    margin: 0;
    padding: 0;
  }
  display: flex;
  justify-content: center;

  .parentBox {
    /* background-color: rgba(245, 245, 245, 255); */
    padding: 10px;
    margin: 20px 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-shadow: 5px 5px 10px rgba(0, 0, 255, 0.2);

    textarea {
      padding: 10px;
      box-sizing: border-box;
      border: none;
      resize: none;
    }
  }
  .content {
    width: 100%;
    height: 100px;
    background-color: rgba(245, 245, 245, 255);
    color: rgb(98, 98, 112);
    &::placeholder {
      color: rgb(98, 98, 112);
    }
  }
`;

const CommentWriter = ({inputContent, setInputContent, changeState}) => {
    const getUserEmail = window.sessionStorage.getItem("userEmail");
    const getSocialId = window.sessionStorage.getItem("social_id");
    const onChangeContent = (e) => setInputContent(e.target.value);

    // 엔터 클릭 이벤트
    const onPressEnter = async (e) => {
        if (e.key === "Enter") {
            console.log("엔터 클릭");
            const res = await SocialApi.commentWrite(
                getSocialId,
                getUserEmail,
                inputContent
            );
            if (res.data === true) {
                alert("댓글이 작성되었습니다.");
                changeState(true); // 댓글 입력 완료 시 render하기 위해 부모 값(isSubmit) 변환
                setInputContent(""); // 작성 완료시 textarea 초기화
            } else alert("댓글 작성에 실패했습니다.");
            changeState(false);
        }
    };
    return (
        <WriteBlock>
            <div className="parentBox">
        <textarea
            value={inputContent}
            onChange={onChangeContent}
            onKeyPress={onPressEnter}
            className="content"
            placeholder="댓글을 입력해주세요 (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧^"
        />
            </div>
        </WriteBlock>
    );
};

export default CommentWriter;
