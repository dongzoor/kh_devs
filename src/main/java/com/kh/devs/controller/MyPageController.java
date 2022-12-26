package com.kh.devs.controller;

import com.kh.devs.dao.MySocialRepository;
import com.kh.devs.dto.CalendarDTO;
import com.kh.devs.dto.CommentDTO;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.dto.StudyDTO;
import com.kh.devs.entity.Calendar;
import com.kh.devs.entity.Comment;
import com.kh.devs.entity.Study;
import com.kh.devs.entity.User;
import com.kh.devs.service.CommentService;
import com.kh.devs.service.MyPageService;
import com.kh.devs.service.SocialService;
import com.kh.devs.service.StudyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MyPageController {

    private final MyPageService myPageService;
    private final SocialService socialService;

    // 작성글 조회
    @GetMapping("/api/myPage/mySocial/{userId}")
    public ResponseEntity<List<SocialDTO>> socialList(@PathVariable Long userId) {
        List<SocialDTO> list = myPageService.getSocialList(userId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 작성글 개별 삭제
    @DeleteMapping("/api/myPage/mySocial/delete/{Id}")
    public Map<String, Object> delete(@PathVariable("Id") long Id) {
        Map<String, Object> response = new HashMap<>();
        if (socialService.delSocial(Id) > 0) {
            response.put("result", "OK");
        } else {
            response.put("result", "NOK");
            response.put("reason", "일치하는 게시글 정보가 없습니다.");
        }
        return response;
    }

    // 작성 댓글 조회
    @GetMapping("/api/myPage/myComment/{userId}")
    public ResponseEntity<List<CommentDTO>> commentList(@PathVariable Long userId) {
        List<CommentDTO> list = myPageService.getCommentList(userId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
//    @GetMapping("/api/myPage/myComment/{userId}")
//    public ResponseEntity<List<SocialDTO>> commentList(@PathVariable("userId") Long userId) {
//        List<SocialDTO> socialDTO = myPageService.getCommentList(userId);
//        return new ResponseEntity<>(socialDTO, HttpStatus.OK);
//    }


    // 작성 댓글 삭제
    @DeleteMapping("/api/myPage/myComment/delete/{Id}")
    public Map<String, Object> commentDelete(@PathVariable("Id") long commentId) {
        Map<String, Object> response = new HashMap<>();
        if (myPageService.delComment(commentId) > 0) {
            response.put("result", "OK");
        } else {
            response.put("result", "NOK");
            response.put("reason", "일치하는 게시글 정보가 없습니다.");
        }
        return response;
    }

    // 가입한 스터디 조회
    @GetMapping("/api/myPage/myStudy/{userId}")
    public ResponseEntity<List<Study>> studyList(@PathVariable Long userId){
        List<Study> list = myPageService.getStudyList(userId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 캘린더 일정 전체 조회
    @GetMapping("/api/myPage/myCalendar/{userId}")
    public ResponseEntity<List<Calendar>> CalendarList(@PathVariable Long userId) {
        List<Calendar> list = myPageService.getCalendarList(userId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    // 캘린더 일정 입력
    @PostMapping("/api/myPage/myCalendar/add")
    public ResponseEntity<Boolean> calendarAdd(@RequestBody Map<String, String> regData) throws Exception {
        String userId = regData.get("userId");
        String title = regData.get("title");
        String content = regData.get("content");
        String color = regData.get("color");
        String startDate = regData.get("startDate");
        String endDate = regData.get("endDate");

        boolean result = myPageService.regCalendar(userId, title, content, color, startDate, endDate);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // 마이스터디 캘린더에 일정 추가
    @PostMapping("/api/myPage/myStudy/add")
    public ResponseEntity<Boolean> myStudyAddCalendar(@RequestBody Map<String, String> regData) throws Exception {
        String userId = regData.get("userId");
        String title = regData.get("title");
        String color = regData.get("color");
        String startDate = regData.get("startDate");

        boolean result = myPageService.addCalendar(userId, title, color, startDate);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // 일정 상세페이지 조회
//    @GetMapping("/api/myPage/myCalendar/detail/{calendarId}")
//    public ResponseEntity<List<Calendar>> eventList(@PathVariable Long calendarId) {
//        List<Calendar> list = myPageService.getEventList(calendarId);
//        return new ResponseEntity<>(list, HttpStatus.OK);
//    }
    @GetMapping("/api/myPage/myCalendar/detail/{calendarTitle}")
    public ResponseEntity<List<Calendar>> eventList(@PathVariable String calendarTitle) {
        List<Calendar> list = myPageService.getEventList(calendarTitle);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 일정 삭제
    @DeleteMapping("/api/myPage/myCalendar/delete/{calendarId}")
    public Map<String, Object> deleteCalendar(@PathVariable("calendarId") long calendarId) {
        Map<String, Object> response = new HashMap<>();
        if (myPageService.delCalendar(calendarId) > 0) {
            response.put("result", "OK");
        } else {
            response.put("result", "NOK");
            response.put("reason", "일치하는 게시글 정보가 없습니다.");
        }
        return response;
    }

    // 일정 수정
    @PutMapping("/api/myPage/myCalendar/update/{calendarId}")
    public ResponseEntity<Boolean> calendarUpdate(@PathVariable("calendarId") long pathCalendarId, @RequestBody Map<String, String> updateData) throws Exception {
        Long calendarId = pathCalendarId;
        String title = updateData.get("title");
        String content = updateData.get("content");
        String color = updateData.get("color");
        String startDate = updateData.get("startDate");
        String endDate = updateData.get("endDate");
        boolean result = myPageService.updateCalendar(calendarId, title, content, color, startDate, endDate);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

}
