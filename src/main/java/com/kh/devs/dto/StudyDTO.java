package com.kh.devs.dto;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StudyDTO {
    private String writer;
    private String title;
    private String content;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime regTime;
    private String imgUrl;
    private int readCount;
    private boolean studyApply;
    private int studyApplyCount;
}
