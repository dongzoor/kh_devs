package com.kh.devs.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.devs.dao.CommentRepository;
import com.kh.devs.dao.SocialRepository;
import com.kh.devs.dao.UserRepository;
import com.kh.devs.dto.CommentDTO;
import com.kh.devs.entity.Comment;
import com.kh.devs.entity.Social;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommentService {
    @Autowired
    private final CommentRepository commentRepository;
    @Autowired
    private final SocialRepository socialRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    // 댓글 조회
    public List<CommentDTO> getCommentList(Long socialId) {
        List<CommentDTO> dtoList = new ArrayList<>();
        Social social = socialRepository.findById(socialId).get();
        for(Comment comment : social.getCommentList()) {
            CommentDTO commentDTOS = new CommentDTO();
            commentDTOS.setId(comment.getId());
            commentDTOS.setUser(comment.getUser());
            commentDTOS.setContent(comment.getContent());
            commentDTOS.setPostDate(comment.getPostDate());
            commentDTOS.setSocialId(comment.getSocial());
            dtoList.add(commentDTOS);
        }
        return dtoList;
    }
    // 댓글 입력
    public CommentDTO setComment(Map<String, String> reqData) {
        Comment comment = Comment.builder()
                .id(Long.valueOf(reqData.get("commentId")))
                .social(socialRepository.findById(Long.valueOf(reqData.get("socialId"))).get())
                .user(userRepository.findById(Long.valueOf(reqData.get("userId"))).get())
                .content(reqData.get("content"))
                .postDate(LocalDateTime.from(new Date().toInstant()))
                .build();
        // Insert
        commentRepository.saveAndFlush(comment);
        return objectMapper.convertValue(comment, CommentDTO.class);

    }
}