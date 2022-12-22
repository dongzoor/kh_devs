package com.kh.devs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.kh.devs.controller.StringListConverter;
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
    //J2 추가 : JPA 사용 시 양방향 관계를 조회하면 양방향 참조로 인한 무한 루프가 발생 -> 이를 방지하기 위한 어노테이션
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
    @Column(name = "social_like")
    private int like;               // 좋아요 수
    @Column(name = "social_view", columnDefinition = "integer default 0")
    private int view;               // 조회수
    @Column(name = "social_saved")
    private int saved;              // 저장 횟수

    // 해시태그
    @Convert(converter = StringListConverter.class)
    private List<String> hashtag;

    // 댓글
    // CascadeType.REMOVE : 게시글이 삭제되면 댓글 또한 삭제
    @OneToMany(mappedBy = "social", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @OrderBy("id DESC") // 댓글 정렬
    private List<Comment> comments = new ArrayList<>();

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
