package com.kh.devs.controller;

import com.kh.devs.dto.SocialDTO;
import com.kh.devs.service.SocialService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/social")
public class SocialController {
    @Autowired
    private final SocialService socialService; // Controller 는 넘어온 요청을 처리하기 위해 Service 를 호출한다.

    // social 전체 목록 조회
    @GetMapping
    public ResponseEntity<List<SocialDTO>> socialList() {
        List<SocialDTO> list = socialService.getSocialList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // social 디테일 페이지 조회
    @GetMapping("/{Id}")  // 이름으로 회원 조회
    public ResponseEntity<SocialDTO> socialList(@PathVariable Long Id) {
        SocialDTO socialDTO = socialService.getSocialList(Id); // getSocialList의 오버로딩
        return new ResponseEntity<>(socialDTO, HttpStatus.OK);
    }

    // social 작성(등록)
    @PostMapping("/write")
    public ResponseEntity<Boolean> socialWrite(@RequestBody Map<String, String> regData) throws Exception { // RequestBody로 받음
        Long userid = Long.valueOf(regData.get("userid"));
        String title = regData.get("title");
        String content = regData.get("content");
        String tag = regData.get("tag");
        String image = regData.get("image");
        boolean result = socialService.regSocial(userid, title, content, tag, image);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);  // 프론트의 res.data 값(true)으로 넘어온다!!!
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // social 수정
    @PutMapping("/{Id}/update")
    public ResponseEntity<Boolean> socialUpdate(@PathVariable("Id") long pathSocialId, @RequestBody Map<String, String> editData) throws Exception {
        Long socialId = pathSocialId;
        String title = editData.get("title");
        String content = editData.get("content");
        String tag = editData.get("tag");
        String image = editData.get("image");
        boolean result = socialService.updateSocial(socialId, title, content, tag, image);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);  // 프론트의 res.data 값(true)으로 넘어온다!!!
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // social 삭제
    @DeleteMapping("/{Id}")
    public Map<String, Object> delete(@PathVariable("Id") long Id) {
        Map<String, Object> response = new HashMap<>();
        if (socialService.delSocial(Id) > 0) {
            response.put("result", "SUCCESS"); // front 의 res.data.result === "SUCCESS" 와 연결된당!!!
        } else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 게시글 정보가 없습니다.");
        }
        return response;
    }
}