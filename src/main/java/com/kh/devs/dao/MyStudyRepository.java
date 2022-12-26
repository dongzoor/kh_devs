package com.kh.devs.dao;

import com.kh.devs.entity.Social;
import com.kh.devs.entity.Study;
import com.kh.devs.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MyStudyRepository extends JpaRepository<Study, Long> {

    // 가입한 스터디 조회
    @Query(value = "SELECT * FROM STUDY WHERE APPLY_PEOPLE LIKE %:nickName% ORDER BY REG_TIME DESC", nativeQuery = true)
    List<Study> findByApplyPeople(String nickName);

}
