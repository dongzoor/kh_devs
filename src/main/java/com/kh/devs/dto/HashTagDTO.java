package com.kh.devs.dto;

import com.kh.devs.entity.Social;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HashTagDTO {
    //    private List<HashTag> hashTagDTO;
    private Long id;            // 해시태그 ID
    private String tag;         // 해시태그 내용
    private Long userId;        // 작성자 ID
    private Social socialId;    // social 게시글 ID
}
