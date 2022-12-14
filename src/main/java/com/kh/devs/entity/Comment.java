package com.kh.devs.entity;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@Data
@Builder
public class Comment {
    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;        // 댓글 id

    @Column(name = "comment_content")
    private String content;     // 댓글 내용

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;      // 댓글 작성자

    @Column(name = "comment_create")
    private LocalDateTime postDate;// 댓글 작성일

    @ManyToOne
    @JoinColumn(name = "social_id")
    private Social social;     // 게시글 번호

}
