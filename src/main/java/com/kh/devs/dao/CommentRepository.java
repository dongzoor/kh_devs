package com.kh.devs.dao;

import com.kh.devs.entity.Comment;
import com.kh.devs.entity.Social;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findBySocial_SocialId(Long socialId);
}
