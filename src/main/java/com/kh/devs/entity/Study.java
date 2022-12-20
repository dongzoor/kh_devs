package com.kh.devs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.kh.devs.constant.ApplyStatus;
import com.kh.devs.controller.StringListConverter;
import lombok.*;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity @Table(name = "study") @Getter @Setter @NoArgsConstructor( access = AccessLevel.PROTECTED)
public class Study {

    @Id
    @Column(name = "study_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    private int cnt; //조회수
    private String imgUrl;
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime regTime;   // 생성일
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime updateTime; // 수정일
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime goalTime; // 스터디 시작일

    private String coordinate;

//    @ElementCollection(fetch = FetchType.LAZY)
    @Convert(converter = StringListConverter.class)
    private List<String> hashtag;

    @Enumerated(EnumType.STRING)
    private ApplyStatus applyStatus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")  // user_id FK 설정
    private User user;

    private String addr;

    @Convert(converter = StringListConverter.class)
    private List<String> applyPeople;
    private int studyApplyCount; // 지원자 수
    private int goalPeople;
//
//    public void createdByUser(User user) {
//        this.user = user;
//    }
    @Builder
    public Study(User user, Long id, String title, String content, String imgUrl, int cnt, LocalDateTime regTime,
                 LocalDateTime updateTime, LocalDateTime goalTime, List<String> hashtag, String addr, int goalPeople, ApplyStatus applyStatus,
                 int studyApplyCount, List<String> applyPeople) {
        this.user = user;
        this.id = id;
        this.title = title;
        this.content = content;
        this.imgUrl = imgUrl;
        this.cnt = cnt;
        this.regTime = regTime;
        this.updateTime = updateTime;
        this.goalTime = goalTime;
        this.hashtag = hashtag;
        this.goalPeople = goalPeople;
        this.addr = addr;
        this.applyStatus = applyStatus;
        this.studyApplyCount = studyApplyCount;
        this.applyPeople = applyPeople;
    }

}
