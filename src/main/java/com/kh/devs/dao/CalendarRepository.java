package com.kh.devs.dao;

import com.kh.devs.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    // 캘린더 전체 일정 조회(마이 캘린더 용)
    @Query(value = "SELECT * FROM CALENDAR WHERE USER_ID = :userId", nativeQuery = true)
    List<Calendar> findByUserId(Long userId);

    // 캘린더 일정 조회(Calendar title로 Calendar Id 매칭)
    @Query(value = "select * FROM calendar where calendar_title = :calendarTitle", nativeQuery = true)
    List<Calendar> findByTitle(String calendarTitle);

    // 캘린더 일정 상세 페이지 조회
//    @Query(value = "select * FROM calendar where calendar_id = :calendarId", nativeQuery = true)
//    List<Calendar> findByCalendarId(Long calendarId);
    @Query(value = "select * FROM calendar where calendar_title = :calendarTitle", nativeQuery = true)
    List<Calendar> findByCalendarTitle(String calendarTitle);

    // 캘린더 일정 수정(calendr ID로 조회)
//    @Query(value = "select * from calendar where calendar_id = :calendarId", nativeQuery = true)
//    List<Calendar> findByCalendarId(String CalendarId);

}
