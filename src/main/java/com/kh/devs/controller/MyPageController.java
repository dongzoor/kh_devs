package com.kh.devs.controller;

import com.kh.devs.dto.SocialDTO;
import com.kh.devs.service.SocialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MyPageController {

    private final SocialService socialService; // Controller 는 넘어온 요청을 처리하기 위해 Service 를 호출한다.

    @GetMapping("/api/myPage/mySocial/{userId}")
    public ResponseEntity<List<SocialDTO>> socialList(@PathVariable("userId") Long userId) {
        List<SocialDTO> list = socialService.getSocialList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
