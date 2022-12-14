package com.kh.devs.dao;

import com.kh.devs.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
//    Comment findBySocialId(Long socialId);
}
