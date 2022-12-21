package com.kh.devs.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "hashtag")
@Getter
@Setter
public class HashTag {
    @Id
    @Column(name = "tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;                // 해시태그 id

    @Column(name = "tag_name")
    private String tag;             // 댓글 내용

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;              // 댓글 작성자

    @ManyToOne
    @JoinColumn(name = "social_id")
    private Social social;          // 게시글 번호
}
