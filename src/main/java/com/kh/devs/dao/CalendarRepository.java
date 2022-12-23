package com.kh.devs.dao;

import com.kh.devs.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    // 캘린더 일정 조회
    @Query(value = "SELECT * FROM CALENDAR WHERE USER_ID = :userId", nativeQuery = true)
    List<Calendar> findByUserId(Long userId);


}
