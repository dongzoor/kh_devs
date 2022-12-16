package com.kh.devs.dao;

import com.kh.devs.entity.Social;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SocialRepository extends JpaRepository<Social, Long> {// <엔티티, key 의 자료형>

//    Social findBySocialId(Long socialId);

//    void delete(Social socialId);

    List<Social> findAll();

    // HN) 마이페이지 작성글 조회용
    @Query(value = "SELECT * FROM SOCIAL WHERE USER_ID = :userId ORDER BY SOCIAL_CREATE DESC", nativeQuery = true)
    List<Social> findAllByUserId(Long userId);
}
