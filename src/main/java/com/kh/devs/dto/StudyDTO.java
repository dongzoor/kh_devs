package com.kh.devs.dto;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.kh.devs.entity.Hashtag;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class StudyDTO {
    private Long studyId;
    private String writer;
    private String title;
    private String content;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime regTime;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime goalTime;
    private String imgUrl;
    private List<Hashtag> hashtags;
    private int readCount;
    private boolean studyApply;
    private int studyApplyCount;
}
