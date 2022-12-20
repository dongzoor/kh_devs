package com.kh.devs.dto;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.kh.devs.constant.ApplyStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class StudyDTO {
    private String userId;
    private Long studyId;
    private String title;
    private String content;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime regTime;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime goalTime; // 스터디 시작 날짜
    private String imgUrl;
    private List<String> hashtag;
    private String addr; // 주소
    private List<String> applyPeople;
    private int goalPeople; // 목표 참여인원
    private int readCount;
    private boolean studyApply;
    private int applyCnt; //지원자 수
    
    @Enumerated(EnumType.STRING)
    private ApplyStatus applyStatus;
}
