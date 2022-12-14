package com.kh.devs.controller;

import com.kh.devs.dto.CommentDTO;
import com.kh.devs.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
//@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentDTO>> commentList(Long socialId) {
        List<CommentDTO> comments = commentService.getCommentList(socialId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CommentDTO> setComment(@RequestBody Map<String, String> reqData) {
        CommentDTO comment = commentService.setComment(reqData);
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

}
