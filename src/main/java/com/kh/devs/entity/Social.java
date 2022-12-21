package com.kh.devs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "social")
public class Social {
    @Id
    @Column(name = "social_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long socialId;// 게시글 id

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;            // 작성자 id
    @Column(name = "social_title", nullable = false)
    private String title;           // 게시글 제목
    @Column(name = "social_content", nullable = false, columnDefinition = "TEXT")
    private String content;         // 게시글 내용
    @Column(name = "social_image")
    private String image;           // 이미지 Link
    @Column(name = "image_id")
    private String imageId;         // 이미지  UUID
    //    @Column(name = "social_tag")
//    private String tag;             // 해시태그
    @Column(name = "social_like")
    private int like;               // 좋아요 수
    // 조회수의 기본 값을 0으로 지정, null 불가 처리
    @Column(name = "social_view", columnDefinition = "integer default 0", nullable = false)
    private int view;               // 조회수
    @Column(name = "comment")
    private int comment;            // 댓글 수
    @Column(name = "social_saved")
    private int saved;              // 저장 횟수

    // 댓글
    @OneToMany(mappedBy = "social", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    // CascadeType.REMOVE : 게시글이 삭제되면 댓글 또한 삭제
    @OrderBy("id DESC") // 댓글 정렬
    private List<Comment> comments = new ArrayList<>();

    // 해시태그
    @OneToMany(mappedBy = "social", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<HashTag> hashTags = new ArrayList<>();

    // 작성 일자
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @Column(name = "social_create")
    private LocalDateTime postDate;
    // 수정 일자
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @Column(name = "social_update")
    private LocalDateTime upDate;
}
