package com.kh.devs.service;

import com.kh.devs.dao.*;
import com.kh.devs.dto.CommentDTO;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.entity.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
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
    private final CalendarRepository calendarRepository;
    private final UserRepository userRepository;
    private final SocialRepository socialRepository;

    // 작성글 전체 조회
    public List<SocialDTO> getSocialList(Long userId) {
        List<SocialDTO> socialDTOS = new ArrayList<>();
        List<Social> socialList = mySocialRepository.findAllByUserId(userId);
        for (Social e : socialList) {
            SocialDTO socialDTO = new SocialDTO();
            socialDTO.setSocialId(e.getSocialId());
            socialDTO.setTitle(e.getTitle());
            socialDTO.setPostDate(e.getPostDate());
//            socialDTO.setComment(e.getComment());
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
//            Social social = socialRepository.findBy...().get(0);
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setId(e.getId()); // 댓글 ID
            commentDTO.setContent(e.getContent());
            commentDTO.setPostDate(e.getPostDate());
            commentDTO.setUserId(e.getUser().getUserId());
//            SocialId가 Null값으로 불려와짐....
//            commentDTO.setSocialId(e.getSocial().getSocialId(socialId));
//            commentDTO.setSocialId(e.getSocial());
            CommentDTOs.add(commentDTO);
        }
        return CommentDTOs;
    }

//    public List<Comment> getCommentList(Long userId) {
//        return myCommentRepository.findAllByUserId(userId);
//    }


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
    public List<Study> getStudyList(Long userId) {
        return myStudyRepository.findByApplyPeople(userId);
    }

    // 캘린더 일정 조회
    public List<Calendar> getCalendarList(Long userId) {
        return calendarRepository.findByUserId(userId);
    }

    // 캘린더 일정 입력
    public boolean regCalendar(String userId, String title, String content, String color, String startDate, String endDate) throws Exception {
        try {
            User user = userRepository.findByUserId(Long.parseLong(userId)).get(0);
            Calendar calendar = new Calendar();
            calendar.setUser(user);
            calendar.setTitle(title);
            calendar.setContent(content);
            calendar.setColor(color);
            calendar.setStartDate(startDate);
            calendar.setEndDate(endDate);
            Calendar rst = calendarRepository.save(calendar);
            return true;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    // 나의 스터디 캘린더에 일정 추가
    public boolean addCalendar(String userId, String title, String color, String startDate) throws Exception {
        try {
            User user = userRepository.findByUserId(Long.parseLong(userId)).get(0);
            Calendar calendar = new Calendar();
            calendar.setUser(user);
            calendar.setTitle(title);
            calendar.setColor(color);
            calendar.setStartDate(startDate);
            Calendar rst = calendarRepository.save(calendar);
            return true;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }



}
