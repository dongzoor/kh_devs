package com.kh.devs.dto;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private List<String> hashtag;
    private int readCount;
    private boolean studyApply;
    private int studyApplyCount;
}
