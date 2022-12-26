package com.kh.devs.dao;

import com.kh.devs.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MyCommentRepository extends JpaRepository<Comment, Long> {

    // 작성 댓글 조회
    @Query(value = "SELECT * FROM COMMENT WHERE USER_ID = :userId ORDER BY comment_create DESC", nativeQuery = true)
    List<Comment> findByUserId(Long userId);
}
