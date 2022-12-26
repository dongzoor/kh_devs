package com.kh.devs.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.kh.devs.entity.Social;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDTO {
    private Long id;                // 댓글 ID
    private String content;         // 댓글 내용
    private Long userId;            // 작성자 ID
    private String userNickName;    // 작성자 닉네임
    private String userImageUrl;    // 작성자 사진 URL
    private Social socialId;        // social 게시글 ID
    private Long socialId2;
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime postDate; // 댓글 작성일
}
