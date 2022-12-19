package com.kh.devs.controller;

import com.kh.devs.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    // 댓글 작성
    @PostMapping("/api/comment")
    public ResponseEntity<Boolean> commentWrite(@RequestBody Map<String, String> regData) throws Exception {
        String socialId = regData.get("socialId");
        String content = regData.get("content");
        String userEmail = regData.get("userEmail");
        System.out.println(userEmail + content + socialId);
        boolean result = commentService.regComment(socialId, content, userEmail);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);  // 프론트의 res.data 값(true)으로 넘어온다!!!
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // Comment 삭제
    @DeleteMapping("/api/social/comment")
    public Map<String, Object> commentDelete(@RequestBody Long regData) {
        Map<String, Object> response = new HashMap<>();
        Long id = regData;
        if (commentService.delComment(id) > 0) {
            response.put("result", "SUCCESS"); // front 의 res.data.result === "SUCCESS" 와 연결된당!!!
        } else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 게시글 정보가 없습니다.");
        }
        return response;
    }
}
