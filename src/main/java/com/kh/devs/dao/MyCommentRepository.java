package com.kh.devs.dao;

import com.kh.devs.entity.Comment;
import com.kh.devs.entity.Social;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MyCommentRepository extends JpaRepository<Comment, Long> {

    // 작성 댓글 조회
    @Query(value = "SELECT * FROM COMMENT WHERE USER_ID = :userId ORDER BY COMMENT_CREATE DESC", nativeQuery = true)
    List<Comment> findAllByUserId(Long userId);
}
