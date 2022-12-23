package com.kh.devs.dao;

import com.kh.devs.entity.Study;
import com.kh.devs.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Long> {
    List<Study> findByUser(User user);
//    Optional<Study> findById(Long studyId);

    @Query(value = "SELECT * FROM SOCIAL WHERE hashtag like %:tag% ORDER BY SOCIAL_CREATE DESC", nativeQuery = true)
    List<Study> findByHashtag(@Param("tag") String tag);
}
