package com.kh.devs.controller;

import com.kh.devs.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Slf4j
public class CommentController {
    private final CommentService commentService;

    // 댓글 작성
    @PostMapping("/comment/post")
    public ResponseEntity<Boolean> commentWrite(@RequestBody Map<String, String> regData) throws Exception {
        String socialId = regData.get("socialId");
        String content = regData.get("content");
        String userEmail = regData.get("userEmail");
        System.out.println(userEmail + content + socialId);
        boolean result = commentService.regComment(socialId, content, userEmail);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);  // 프론트의 res.data 값(true)으로 넘어감
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // Comment 삭제
    @PostMapping("/comment/delete")
    public ResponseEntity<Boolean> commentDelete(@RequestBody Map<String, Long> regData) throws Exception {
        log.warn(regData.toString());
        Map<String, Object> response = new HashMap<>();
        Long id = regData.get("commentId");
        System.out.println(id);
        if (commentService.delComment(id) > 0) { // 삭제 성공하면 1이 return 되므로
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }
}