package com.kh.devs.service;

import com.kh.devs.dao.*;
import com.kh.devs.dto.CommentDTO;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.dto.StudyDTO;
import com.kh.devs.entity.Comment;
import com.kh.devs.entity.Social;
import com.kh.devs.entity.Study;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class MyPageService {

    private final MySocialRepository mySocialRepository;
    private final MyCommentRepository myCommentRepository;
    private final MyStudyRepository myStudyRepository;
    private final CommentRepository commentRepository;
    private final StudyRepository studyRepository;

    // 작성글 전체 조회
    public List<SocialDTO> getSocialList(Long userId) {
        List<SocialDTO> socialDTOS = new ArrayList<>();
        List<Social> socialList = mySocialRepository.findAllByUserId(userId);
        for (Social e : socialList) {
            SocialDTO socialDTO = new SocialDTO();
            socialDTO.setSocialId(e.getSocialId());
            socialDTO.setTitle(e.getTitle());
            socialDTO.setPostDate(e.getPostDate());
//            socialDTO.setComment(e.getComment()); 코맨트 컬럼 삭제해서 주석처리 했습니다.
            socialDTO.setView(e.getView());
            socialDTOS.add(socialDTO);
        }
        return socialDTOS;
    }

    // 작성 댓글 조회
    public List<CommentDTO> getCommentList(Long userId) {
        List<Comment> list = myCommentRepository.findAllByUserId(userId);
        List<CommentDTO> CommentDTOs = new ArrayList<>();
        for (Comment e : list) {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setId(e.getId()); // 댓글 ID
            commentDTO.setContent(e.getContent());
            commentDTO.setPostDate(e.getPostDate());
            commentDTO.setUserId(e.getUser().getUserId());
//            SocialId가 Null값으로 불려와짐....
//            commentDTO.setSocialId(e.getSocial().getSocialId());
//            commentDTO.setSocialId(e.getSocial());
            CommentDTOs.add(commentDTO);
        }
        return CommentDTOs;
    }

    // 작성 댓글 삭제
    @Transactional
    public int delComment(Long id) {
        Comment comment = commentRepository.findById(id).get();
        if (!Objects.isNull(comment)) {
            commentRepository.deleteById(comment.getId());
            return 1;
        } else {
            return 0;
        }
    }

    // 가입한 스터디 조회
    public List<StudyDTO> getStudyList(Long userId) {
        List<StudyDTO> studyDTOS = new ArrayList<>();
        List<Study> studyList = myStudyRepository.findByApplyPeople(userId);
        for (Study e : studyList) {
            StudyDTO studyDTO = new StudyDTO();
            studyDTO.setStudyId(e.getId());
            studyDTO.setImgUrl(e.getImgUrl());
//            studyDTO.setWriter(e.getWriter());
            studyDTO.setTitle((e.getTitle()));
            studyDTO.setContent(e.getContent());
            studyDTO.setHashtag(e.getHashtag());
            studyDTOS.add(studyDTO);
        }
        return studyDTOS;
    }
}
