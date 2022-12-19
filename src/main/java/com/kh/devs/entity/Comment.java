package com.kh.devs.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@Getter
@Setter
public class Comment {

    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;                // 댓글 id
    @Column(name = "comment_content")
    private String content;         // 댓글 내용
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;              // 댓글 작성자
    @ManyToOne
    @JoinColumn(name = "social_id")
    private Social social;          // 게시글 번호

    @Column(name = "comment_create")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime postDate; // 댓글 작성일
}