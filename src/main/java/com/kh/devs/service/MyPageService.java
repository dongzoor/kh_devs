package com.kh.devs.service;

import com.kh.devs.dao.*;
import com.kh.devs.dto.CommentDTO;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.entity.*;
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
        List<Comment> list = myCommentRepository.findByUserId(userId);
        List<CommentDTO> CommentDTOs = new ArrayList<>();
        for (Comment e : list) {
//            SocialDTO socialDTO = new SocialDTO();
//            socialDTO.setSocialId(e.getSocial().getSocialId());
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setSocialId2(e.getSocial().getSocialId());
            commentDTO.setId(e.getId()); // 댓글 ID
            commentDTO.setContent(e.getContent());
            commentDTO.setPostDate(e.getPostDate());
            commentDTO.setUserId(e.getUser().getUserId());
            CommentDTOs.add(commentDTO);
        }
        return CommentDTOs;
    }
//    public List<SocialDTO> getCommentList(Long userId) {
//        List<SocialDTO> socialDTOS = new ArrayList<>();
//        List<User> users = userRepository.findAll();
//        for (User u : users) {
//            UserDTO userDTOS = new UserDTO();
//            userDTOS.setUserId(u.getUserId());
//            List<Social> socialList = socialRepository.findAll();
//            for (Social e : socialList) {
//                SocialDTO socialDTO = new SocialDTO();
//                socialDTO.setSocialId(e.getSocialId());
//                socialDTO.setUserNickName(e.getUser().getUserNickname());       // 작성자 닉네임
//                socialDTO.setTitle(e.getTitle());
//                socialDTO.setPostDate(e.getPostDate());
//                socialDTOS.add(socialDTO);
//                // 댓글 list 조회
//                List<Comment> list = myCommentRepository.findByUserId(userId);
//                List<CommentDTO> CommentDTOs = new ArrayList<>();
//                for (Comment c : list) {
//                    CommentDTO commentDTO = new CommentDTO();
//                    commentDTO.setId(c.getId());
//                    commentDTO.setContent(c.getContent());
//                    commentDTO.setPostDate(c.getPostDate());
//                    commentDTO.setUserId(c.getUser().getUserId());
//                    CommentDTOs.add(commentDTO);    // CommentDTOs list에 값을 담는다
//                }
//                socialDTO.setComments(CommentDTOs); // 모든 댓글 list 값을 socialDTO에 담기
//            }
//        }
//        return socialDTOS;
//    }


//    public List<Comment> getCommentList(Long userId) {
//        return myCommentRepository.findByUserId(userId);
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
    public List<Study> getStudyList(String nickName) {
        return myStudyRepository.findByApplyPeople(nickName);
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

    // 일정 상세페이지 조회(title로 조회)
    public List<Calendar> getEventList(String calendarTitle) {
        return calendarRepository.findByCalendarTitle(calendarTitle);
    }

    // 일정 삭제
    @Transactional // 삭제
    public int delCalendar(Long calendarId) {
        Calendar calendar = calendarRepository.findById(calendarId).get();
        if (!Objects.isNull(calendar)) {
            calendarRepository.deleteById(calendar.getCalendarId());
            return 1;
        } else {
            return 0;
        }
    }

    // 일정 조회(calendar Id로 조회)
//    public List<Calendar> eventSearch(String calendarId) {
//        List<Calendar> calendar = calendarRepository.findByCalendarId(calendarId);
//        return calendar;
//    }

    // 일정 수정
    @Transactional
    public boolean updateCalendar(Long calendarId, String title, String content, String color, String startDate, String endDate) {
        Calendar calendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("실패: 일정을 찾을 수 없습니다.");
                });
        calendar.setTitle(title);
        calendar.setContent(content);
        calendar.setColor(color);
        calendar.setStartDate(startDate);
        calendar.setEndDate(endDate);
        return true;
    }



}
