package com.kh.devs.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SocialDTO {
    private Long socialId;          // 게시글 id
    private String title;           // 게시글 제목
    private String content;         // 게시글 내용
    private String tag;             // 해시태그
    private String image;           // 첨부 이미지 Link
    private String imageId;         // 첨부 이미지 ID
    private int like;               // 좋아요 수
    private int view;               // 조회수
    private int comment;            // 댓글 수
    private int saved;              // 저장 횟수
    // USER DATA
    private String userEmail;       // 작성자 email
    private String userNickName;    // 작성자 nickname
    private String userImageId;     // 작성자 이미지 ID
    private String userImageUrl;    // 작성자 이미지 URL

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime postDate; // 작성 일자

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime upDate;   // 수정 일자
}
