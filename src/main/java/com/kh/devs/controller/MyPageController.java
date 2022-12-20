package com.kh.devs.controller;

import com.kh.devs.dao.MySocialRepository;
import com.kh.devs.dto.CommentDTO;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.entity.Study;
import com.kh.devs.service.CommentService;
import com.kh.devs.service.MyPageService;
import com.kh.devs.service.SocialService;
import com.kh.devs.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MyPageController {

    private final MyPageService myPageService;
    private final MySocialRepository mySocialRepository;
    private final SocialService socialService;
    private final StudyService studyService;
    private final CommentService commentService;

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

}
