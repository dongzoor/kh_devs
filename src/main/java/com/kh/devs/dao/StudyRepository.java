package com.kh.devs.dao;

import com.kh.devs.entity.Social;
import com.kh.devs.entity.Study;
import com.kh.devs.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Long> {
    List<Study> findByUser(User user);

    @Query(value = "SELECT * FROM STUDY WHERE hashtag like %:tag% ORDER BY REG_TIME DESC", nativeQuery = true)
    List<Study> findByHashtag(@Param("tag") String tag);

    @Query(value = "SELECT * FROM STUDY WHERE title like %:TorC% or content like %:TorC% ORDER BY REG_TIME DESC", nativeQuery = true)
    List<Study> findByTitleOrContent(@Param("TorC") String TorC);



    // HN) 마이페이지 작성글 조회용 + JY 수정(@Param("userId") 어노테이션 추가)
    @Query(value = "SELECT * FROM STUDY WHERE USER_ID = :userId ORDER BY REG_TIME DESC", nativeQuery = true)
    List<Study> findAllByUserId(@Param("userId") Long userId);
}
