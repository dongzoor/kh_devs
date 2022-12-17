package com.kh.devs.dto;

import com.kh.devs.entity.Social;
import lombok.Data;

import java.time.LocalDateTime;


@Data
public class CommentDTO {
    private Long id;                // 댓글 ID
    private String content;         // 댓글 내용
    private Long userId;            // 작성자 ID
    private String userNickName;    // 작성자 닉네임
    private String userImageUrl;    // 작성자 사진 URL
    private LocalDateTime postDate; // 댓글 작성일
    private Social socialId;        // social 게시글 ID
}
