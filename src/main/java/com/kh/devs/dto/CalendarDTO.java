package com.kh.devs.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalendarDTO {      // 캘린더 Event(일정)
    private Long calendarId;    // 일정 ID
    private String title;       // 일정 제목
    private String content;     // 일정 내용
    private String startDate;     // 일정 시작 날짜 및 시간
    private String endDate;       // 일정 종료 날짜 및 시간
    private String color;       // 캘린더 일정 표시 색상
    private Long userId;        // 작성자 ID
}
