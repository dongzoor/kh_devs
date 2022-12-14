package com.kh.devs.dao;

import com.kh.devs.entity.Social;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SocialRepository extends JpaRepository<Social, Long> {// <엔티티, key 의 자료형>

    List<Social> findAll();

    List<Social> findBySocialId(Long socialId);

    // [해시태그] 검색 쿼리
    @Query(value = "SELECT * FROM SOCIAL WHERE hashtag like %:tag% ORDER BY SOCIAL_CREATE DESC", nativeQuery = true)
    List<Social> findByHashtag(@Param("tag") String tag);

    // [제목+내용] 검색 쿼리
    @Query(value = "SELECT * FROM SOCIAL WHERE social_title like %:TorC% or social_content like %:TorC% ORDER BY SOCIAL_CREATE DESC", nativeQuery = true)
    List<Social> findByTitleOrContent(@Param("TorC") String TorC);

    // HN) 마이페이지 작성글 조회용 + JY 수정(@Param("userId") 어노테이션 추가)
    @Query(value = "SELECT * FROM SOCIAL WHERE USER_ID = :userId ORDER BY SOCIAL_CREATE DESC", nativeQuery = true)
    List<Social> findAllByUserId(@Param("userId") Long userId);
}
