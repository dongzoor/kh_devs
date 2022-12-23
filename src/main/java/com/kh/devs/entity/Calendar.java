package com.kh.devs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "calendar")
public class Calendar {

    // 일정 ID
    @Id
    @Column(name = "calendar_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long calendarId;

    // 작성자 id
    //J2 추가 : JPA 사용 시 양방향 관계를 조회하면 양방향 참조로 인한 무한 루프가 발생 -> 이를 방지하기 위한 어노테이션
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    // 일정 제목
    @Column(name = "calendar_title", nullable = false)
    private String title;

    // 일정 내용
    @Column(name = "calendar_content")
    private String content;

    // 일정 시작 날짜
    @Column(name = "start_date", nullable = false)
    private String startDate;

    // 일정 종료 날짜
    @Column(name = "end_date")
    private String endDate;

    // 캘린더 일정 표시 색상
    @Column(name = "event_color")
    private String color;

}
