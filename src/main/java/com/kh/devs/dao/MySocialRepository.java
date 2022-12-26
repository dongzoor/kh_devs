package com.kh.devs.dao;

import com.kh.devs.entity.Social;
import com.kh.devs.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MySocialRepository extends JpaRepository<Social, Long> {

    // 작성글 조회
    @Query(value = "SELECT * FROM SOCIAL WHERE USER_ID = :userId ORDER BY SOCIAL_CREATE DESC", nativeQuery = true)
    List<Social> findAllByUserId(Long userId);

    // 작성 댓글 조회
    // join 추가!!
//    @Query(value = "SELECT * FROM SOCIAL WHERE COMMENT_ID = :commentId", nativeQuery = true)
//    List<Social> findByCommentSocialId(Long socialId);
    @Query(value = "SELECT social.social_id, comment.social_id FROM social, comment WHERE social.social_id = comment.social_id", nativeQuery = true)
    List<Social> findByCommentSocialId(Long socialId);
}

