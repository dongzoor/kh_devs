import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SocialApi from "../../api/SocialApi";

const BOX = styled.div`
  display: flex;
  flex-direction: row;
  .hashtag {
    margin: 0px 3px;
    padding: 8px;
    font-style: italic;
    background-color: rgba(219, 219, 219, 0.5);
    border-radius: 10px;
    box-shadow: 0 1px 3px grey;
    color: rgba(3, 0, 209, 0.9);
  }
`;

const HashTagList = () => {
  const params = useParams().socialId; // router에서 지정한 :social 을 붙여줘야함!!
  const [tagList, setTagList] = useState([]);

  // 댓글 조회
  useEffect(() => {
    const HashTagData = async () => {
      try {
        const response = await SocialApi.socialDetail(params);
        setTagList(response.data.tags);
      } catch (e) {
        console.log(e);
      }
    };
    HashTagData();
  }, []);

  return (
    <BOX>
      {tagList &&
        tagList.map((e) => (
          <span className="hashtag" key={e.id}>
            {e.tag}
          </span>
        ))}
    </BOX>
  );
};

export default HashTagList;
