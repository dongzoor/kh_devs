package com.kh.devs.service;

import com.kh.devs.dao.CommentRepository;
import com.kh.devs.dao.SocialRepository;
import com.kh.devs.dao.UserRepository;
import com.kh.devs.entity.Comment;
import com.kh.devs.entity.Social;
import com.kh.devs.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final SocialRepository socialRepository;
    private final UserRepository userRepository;
//    private ObjectMapper objectMapper;

    // 댓글 작성
    public boolean regComment(String socialId, String content, String userEmail) throws Exception {
        try {
            User user = (userRepository.findByUserEmail(userEmail)).get(0); // 객체로 user 정보를 다시 찾아와서 넣어주기 위함
            Long id = (Long.parseLong(socialId));
            Social social = (socialRepository.findBySocialId(id).get(0));
            Comment comment = new Comment();
            comment.setUser(user);
            comment.setSocial(social);
            comment.setContent(content);
            comment.setPostDate(LocalDateTime.now());
            Comment rst = commentRepository.save(comment);
            log.warn(rst.toString());
            return true;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    // 댓글 삭제
    @Transactional
    public int delComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).get();
        if (!Objects.isNull(comment)) {
            commentRepository.deleteById(comment.getId());
            return 1;
        } else {
            return 0;
        }
    }
}